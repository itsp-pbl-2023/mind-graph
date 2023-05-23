package handler

import (
	"context"
	"log"

	"github.com/bufbuild/connect-go"
	"github.com/itsp-pbl-2023/mind-graph/grpc/pb"
)

func (m *mindGraphService) SetTheme(ctx context.Context, c *connect.Request[pb.ThemeRequest]) (*connect.Response[pb.Empty], error) {

	var theme, senderId = c.Msg.Theme, c.Msg.SenderId

	log.Printf("received theme: %v, id: %v\n", theme, senderId)

	m.lock.Lock()
	m.theme = theme
	m.lock.Unlock()

	// send joined event
	m.broadcast(&pb.Event{Event: &pb.Event_ThemeConfirmed{ThemeConfirmed: &pb.ThemeConfirmedEvent{
		Theme:    theme,
		SenderId: senderId,
	}}})

	var res = connect.NewResponse(&pb.Empty{})

	return res, nil
}
