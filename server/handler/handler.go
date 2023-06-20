package handler

import (
	"sync"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb/pbconnect"
)

// type guard (method implementation check)
var _ pbconnect.MindGraphServiceHandler = &mindGraphService{}

type mindGraphService struct {
	users  []*userConnection
	theme  string
	graph  graph
	scores map[string]int    // user id -> score
	votes  map[string]string // user id -> node id

	lock sync.Mutex
}

func NewMindGraphService() pbconnect.MindGraphServiceHandler {
	return &mindGraphService{
		scores: make(map[string]int),
		votes:  make(map[string]string),
	}
}
