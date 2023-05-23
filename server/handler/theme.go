package handler

import (
	"context"
	"log"

	"github.com/bufbuild/connect-go"
	"github.com/itsp-pbl-2023/mind-graph/grpc/pb"
)

type themeConnection struct {
	theme    string
	senderId string
	send     chan<- *pb.Event
}

func (m *mindGraphService) setTheme(conn *themeConnection) {
	m.lock.Lock()
	defer m.lock.Unlock()

	m.theme = conn
}

func (m *mindGraphService) Theme(ctx context.Context, c *connect.Request[pb.ThemeRequest], s *connect.ServerStream[pb.Event]) error {
	ch := make(chan *pb.Event, 10)
	conn := &themeConnection{
		theme:    c.Msg.Theme,
		senderId: c.Msg.SenderId,
		send:     ch,
	}

	log.Printf("received theme: %v, id: %v\n", conn.theme, conn.senderId)
	defer log.Printf("close user connection id: %v, name: %v\n", conn.theme, conn.senderId)

	m.setTheme(conn)

	// send joined event
	m.broadcast(&pb.Event{Event: &pb.Event_ThemeConfirmed{ThemeConfirmed: &pb.ThemeConfirmedEvent{
		Theme:    conn.theme,
		SenderId: conn.senderId,
	}}})

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
