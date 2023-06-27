package handler

import (
	"context"
	"sync"

	"github.com/bufbuild/connect-go"

	"github.com/itsp-pbl-2023/mind-graph/grpc/pb"
	"github.com/itsp-pbl-2023/mind-graph/utils"
)

type node struct {
	id       string
	word     string
	senderID string
}

func (n *node) toPB() *pb.Node {
	return &pb.Node{
		Id:        n.id,
		Word:      n.word,
		CreatorId: n.senderID,
	}
}

type edge struct {
	nodeID1 string
	nodeID2 string
}

func (e *edge) toPB() *pb.Edge {
	return &pb.Edge{
		NodeId_1: e.nodeID1,
		NodeId_2: e.nodeID2,
	}
}

type graph struct {
	nodes []*node
	edges []*edge

	lock sync.Mutex
}

func (g *graph) addNode(word, senderID string) *node {
	g.lock.Lock()
	defer g.lock.Unlock()
	newNode := &node{
		id:       utils.NewID(),
		word:     word,
		senderID: senderID,
	}
	g.nodes = append(g.nodes, newNode)
	return newNode
}

func (g *graph) addEdge(nodeID1, nodeID2 string) *edge {
	g.lock.Lock()
	defer g.lock.Unlock()
	newEdge := &edge{
		nodeID1: nodeID1,
		nodeID2: nodeID2,
	}
	g.edges = append(g.edges, newEdge)
	return newEdge
}

func (m *mindGraphService) CreateNode(_ context.Context, c *connect.Request[pb.CreateNodeRequest]) (*connect.Response[pb.CreateNodeResponse], error) {
	// TODO: スコア計算をちゃんとする
	m.addScore(c.Msg.CreatorId, 5)

	newNode := m.graph.addNode(c.Msg.Word, c.Msg.CreatorId)
	m.broadcast(&pb.Event{Event: &pb.Event_NodeUpdated{NodeUpdated: &pb.NodeUpdateEvent{
		Node: newNode.toPB(),
	}}})
	res := connect.NewResponse(&pb.CreateNodeResponse{
		Id: newNode.id,
	})
	return res, nil
}

func (m *mindGraphService) CreateEdge(_ context.Context, c *connect.Request[pb.CreateEdgeRequest]) (*connect.Response[pb.Empty], error) {
	// TODO: スコア計算をちゃんとする
	m.addScore(c.Msg.CreatorId, 3)

	newEdge := m.graph.addEdge(c.Msg.NodeId1, c.Msg.NodeId2)
	m.broadcast(&pb.Event{Event: &pb.Event_EdgeUpdated{EdgeUpdated: &pb.EdgeUpdateEvent{
		Edge: newEdge.toPB(),
	}}})
	res := connect.NewResponse(&pb.Empty{})
	return res, nil
}
