package handler

import (
	"context"
	"log"

	"github.com/bufbuild/connect-go"
	"github.com/samber/lo"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb"
)

type nodeState struct {
	connectedNodes []string
	depth          int
	finished       bool
}

const INF = 1000000
const MAX_DEPTH = 4

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

// 各ノードのスコアを計算する
func (m *mindGraphService) calcNodeScore(ChosenNodeId string) (nodePoints map[string]int) {
	nodeStates := make(map[string]*nodeState)

	for _, node := range m.graph.nodes {
		nodeStates[node.id] = &nodeState{connectedNodes: []string{}, depth: INF, finished: false}
	}

	// ノードの接続情報を計算
	for _, edge := range m.graph.edges {
		node1 := edge.nodeID1
		node2 := edge.nodeID2

		nodeStates[node1].connectedNodes = append(nodeStates[node1].connectedNodes, node2)
		nodeStates[node2].connectedNodes = append(nodeStates[node2].connectedNodes, node1)
	}

	// chosenNodeIdで選択されたnodeからMAX_DEPTHまでのノードを探索してdepthを計算
	selectedNode := &[]string{ChosenNodeId}
	for i := 0; i < MAX_DEPTH; i++ {
		nextNode := []string{}
		for _, node := range *selectedNode {
			if nodeStates[node].finished == false {
				nodeStates[node].depth = i
				nodeStates[node].finished = true
			}
			nextNode = append(nextNode, nodeStates[node].connectedNodes...)
		}
		selectedNode = &nextNode
	}

	// 最終的なスコアを計算
	nodePoints = make(map[string]int)
	for _, node := range m.graph.nodes {
		nodeState := nodeStates[node.id]

		depth_score := MAX_DEPTH - nodeState.depth
		if depth_score < 0 {
			depth_score = 0
		}
		depth_score = depth_score * depth_score

		nodePoints[node.id] = 1 + len(nodeState.connectedNodes) + depth_score
	}

	return nodePoints
}

func (m *mindGraphService) calcResult() (nodeID string, mvp string, userScores map[string]int) {
	m.lock.Lock()
	defer m.lock.Unlock()

	nodeVotedCounts := make(map[string]int)
	for _, nodeID := range m.votes {
		nodeVotedCounts[nodeID]++
	}
	winnerNode := lo.MaxBy(lo.Entries(nodeVotedCounts), func(a, b lo.Entry[string, int]) bool {
		return a.Value < b.Value
	})

	nodeScores := m.calcNodeScore(winnerNode.Key)

	userScores = make(map[string]int)
	for _, user := range m.users {
		userScores[user.id] = 0
	}
	for _, node := range m.graph.nodes {
		userScores[node.senderID] += nodeScores[node.id]
	}

	mvpUser := lo.MaxBy(lo.Entries(userScores), func(a, b lo.Entry[string, int]) bool {
		return a.Value < b.Value
	})

	return winnerNode.Key, mvpUser.Key, userScores
}

func (m *mindGraphService) VoteWord(_ context.Context, c *connect.Request[pb.VoteWordRequest]) (*connect.Response[pb.Empty], error) {
	finished := m.doVote(c.Msg.SenderId, c.Msg.NodeId)
	log.Printf("user %v voted to node %v -> %v / %v users have finished voting\n",
		c.Msg.SenderId, c.Msg.NodeId, len(m.votedUsers()), len(m.users))

	evt := &pb.VoteProgressEvent{FinishedUserIds: m.votedUsers()}
	m.broadcast(&pb.Event{Event: &pb.Event_VoteProgress{VoteProgress: evt}})

	if finished {
		log.Println("sending result...")
		nodeID, mvpUserID, userScores := m.calcResult()
		m.broadcastVary(func(user *userConnection) *pb.Event {
			res := &pb.ResultEvent{
				ChosenNodeId: nodeID,
				MvpUserId:    mvpUserID,
				MyScore:      int32(userScores[user.id]),
			}
			return &pb.Event{Event: &pb.Event_Result{Result: res}}
		})
		m.reset()
	}

	res := connect.NewResponse(&pb.Empty{})
	return res, nil
}
