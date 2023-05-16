package main

import (
	"context"
	"fmt"

	"github.com/bufbuild/connect-go"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb"
	"github.com/itsp-pbl-2023/mind-graph/grpc/pb/pbconnect"
)

// type guard (method implementation check)
var _ pbconnect.MindGraphServiceHandler = &MindGraphService{}

type MindGraphService struct{}

func (m *MindGraphService) Hello(_ context.Context, c *connect.Request[pb.HelloRequest]) (*connect.Response[pb.HelloResponse], error) {
	name := c.Msg.Name
	res := connect.NewResponse(&pb.HelloResponse{
		Message: fmt.Sprintf("Hello, %v!", name),
	})
	return res, nil
}
