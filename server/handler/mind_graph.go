package handler

import (
	"context"
	"fmt"
	"log"
	"sync"

	"github.com/bufbuild/connect-go"
	"github.com/samber/lo"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb"
	"github.com/itsp-pbl-2023/mind-graph/grpc/pb/pbconnect"
)

type userConnection struct {
	name string
	send chan<- *pb.Event
}

// type guard (method implementation check)
var _ pbconnect.MindGraphServiceHandler = &mindGraphService{}

type mindGraphService struct {
	users []*userConnection
	lock  sync.Mutex
}

func NewMindGraphService() pbconnect.MindGraphServiceHandler {
	return &mindGraphService{}
}

func (m *mindGraphService) currentUsers() []string {
	m.lock.Lock()
	defer m.lock.Unlock()

	return lo.Map(m.users, func(user *userConnection, _ int) string { return user.name })
}

func (m *mindGraphService) addUser(conn *userConnection) error {
	m.lock.Lock()
	defer m.lock.Unlock()

	conflict := lo.ContainsBy(m.users, func(user *userConnection) bool {
		return user.name == conn.name
	})
	if conflict {
		return fmt.Errorf("user with name %v already exists", conn.name)
	}
	m.users = append(m.users, conn)
	return nil
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

func (m *mindGraphService) Hello(_ context.Context, c *connect.Request[pb.HelloRequest]) (*connect.Response[pb.HelloResponse], error) {
	name := c.Msg.Name
	res := connect.NewResponse(&pb.HelloResponse{
		Message: fmt.Sprintf("Hello, %v!", name),
	})
	return res, nil
}

func (m *mindGraphService) Join(ctx context.Context, c *connect.Request[pb.JoinRequest], s *connect.ServerStream[pb.Event]) error {
	ch := make(chan *pb.Event, 10)
	conn := &userConnection{
		name: c.Msg.Name,
		send: ch,
	}

	err := m.addUser(conn)
	if err != nil {
		return connect.NewError(connect.CodeInvalidArgument, err)
	}

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
