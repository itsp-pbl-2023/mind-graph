package handler

import (
	"context"
	"log"

	"github.com/bufbuild/connect-go"
	"github.com/samber/lo"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb"
)

func (m *mindGraphService) doVote(userID string, nodeID string) (finished bool) {
	m.lock.Lock()
	defer m.lock.Unlock()

	m.votes[userID] = nodeID
	return len(m.votes) >= len(m.users)
}

func (m *mindGraphService) votedUsers() []string {
	m.lock.Lock()
	defer m.lock.Unlock()

	return lo.Keys(m.votes)
}

func (m *mindGraphService) calcResult() (nodeID string, mvp string) {
	m.lock.Lock()
	defer m.lock.Unlock()

	nodePoints := make(map[string]int)
	for _, nodeID := range m.votes {
		nodePoints[nodeID]++
	}
	winnerNode := lo.MaxBy(lo.Entries(nodePoints), func(a, b lo.Entry[string, int]) bool {
		return a.Value < b.Value
	})

	mvpUser := lo.MaxBy(lo.Entries(m.scores), func(a, b lo.Entry[string, int]) bool {
		return a.Value < b.Value
	})

	return winnerNode.Key, mvpUser.Key
}

func (m *mindGraphService) VoteWord(_ context.Context, c *connect.Request[pb.VoteWordRequest]) (*connect.Response[pb.Empty], error) {
	finished := m.doVote(c.Msg.SenderId, c.Msg.NodeId)
	log.Printf("user %v voted to node %v -> %v / %v users have finished voting\n",
		c.Msg.SenderId, c.Msg.NodeId, len(m.votedUsers()), len(m.users))

	evt := &pb.VoteProgressEvent{FinishedUserIds: m.votedUsers()}
	m.broadcast(&pb.Event{Event: &pb.Event_VoteProgress{VoteProgress: evt}})

	if finished {
		log.Println("sending result...")
		nodeID, mvpUserID := m.calcResult()
		m.broadcastVary(func(user *userConnection) *pb.Event {
			res := &pb.ResultEvent{
				ChosenNodeId: nodeID,
				MvpUserId:    mvpUserID,
				MyScore:      int32(m.scores[user.id]),
			}
			return &pb.Event{Event: &pb.Event_Result{Result: res}}
		})
	}

	res := connect.NewResponse(&pb.Empty{})
	return res, nil
}
