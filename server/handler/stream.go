package handler

import (
	"context"
	"log"

	"github.com/bufbuild/connect-go"
	"github.com/samber/lo"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb"
	"github.com/itsp-pbl-2023/mind-graph/utils"
)

type userConnection struct {
	id   string
	name string
	send chan<- *pb.Event
}

func (m *mindGraphService) currentUsers() []*pb.User {
	m.lock.Lock()
	defer m.lock.Unlock()

	return lo.Map(m.users, func(user *userConnection, _ int) *pb.User {
		return &pb.User{
			Id:   user.id,
			Name: user.name,
		}
	})
}

func (m *mindGraphService) addUser(conn *userConnection) {
	m.lock.Lock()
	defer m.lock.Unlock()

	m.users = append(m.users, conn)
}

func (m *mindGraphService) removeUser(conn *userConnection) {
	m.lock.Lock()
	defer m.lock.Unlock()

	m.users = lo.Without(m.users, conn)
}

func (m *mindGraphService) broadcast(event *pb.Event) {
	m.lock.Lock()
	defer m.lock.Unlock()

	for _, user := range m.users {
		// non-blocking send
		select {
		case user.send <- event:
		default:
		}
	}
}

func (m *mindGraphService) Join(ctx context.Context, c *connect.Request[pb.JoinRequest], s *connect.ServerStream[pb.Event]) error {
	ch := make(chan *pb.Event, 10)
	conn := &userConnection{
		id:   utils.NewID(),
		name: c.Msg.Name,
		send: ch,
	}
	log.Printf("new user connection id: %v, name: %v\n", conn.id, conn.name)
	defer log.Printf("close user connection id: %v, name: %v\n", conn.id, conn.name)

	m.addUser(conn)

	// send joined event
	m.broadcast(&pb.Event{Event: &pb.Event_Joined{Joined: &pb.UserJoinedEvent{
		Name:         conn.name,
		CurrentUsers: m.currentUsers(),
	}}})

	defer func() {
		m.lock.Lock()
		m.users = lo.Without(m.users, conn)
		m.lock.Unlock()

		// send left event
		m.broadcast(&pb.Event{Event: &pb.Event_Left{Left: &pb.UserLeftEvent{
			Name:         conn.name,
			CurrentUsers: m.currentUsers(),
		}}})
	}()

	for {
		select {
		case event := <-ch:
			err := s.Send(event)
			if err != nil {
				log.Printf("failed to send event: %v\n", err)
				return err
			}
		case <-ctx.Done():
			return nil
		}
	}
}
