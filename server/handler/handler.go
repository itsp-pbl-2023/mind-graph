package handler

import (
	"sync"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb/pbconnect"
)

// type guard (method implementation check)
var _ pbconnect.MindGraphServiceHandler = &mindGraphService{}

type mindGraphService struct {
	users []*userConnection
	theme string
	graph graph
	votes map[string]string // user id -> node id

	lock sync.Mutex
}

func NewMindGraphService() pbconnect.MindGraphServiceHandler {
	return &mindGraphService{
		votes: make(map[string]string),
	}
}

func (m *mindGraphService) reset() {
	m.lock.Lock()
	defer m.lock.Unlock()

	for _, u := range m.users {
		u.close()
	}
	m.users = nil
	m.theme = ""
	m.graph = graph{}
	m.votes = make(map[string]string)
}
