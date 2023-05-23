package handler

import (
	"sync"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb/pbconnect"
)

// type guard (method implementation check)
var _ pbconnect.MindGraphServiceHandler = &mindGraphService{}

type mindGraphService struct {
	users []*userConnection
	theme *themeConnection
	lock  sync.Mutex
}

func NewMindGraphService() pbconnect.MindGraphServiceHandler {
	return &mindGraphService{}
}
