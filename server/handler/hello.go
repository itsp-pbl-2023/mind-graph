package handler

import (
	"context"
	"fmt"

	"github.com/bufbuild/connect-go"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb"
)

func (m *mindGraphService) Hello(_ context.Context, c *connect.Request[pb.HelloRequest]) (*connect.Response[pb.HelloResponse], error) {
	name := c.Msg.Name
	res := connect.NewResponse(&pb.HelloResponse{
		Message: fmt.Sprintf("Hello, %v!", name),
	})
	return res, nil
}
