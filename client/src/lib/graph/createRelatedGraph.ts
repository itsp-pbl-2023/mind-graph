import { Node, Edge } from "../api/api_pb";

const createRelatedGraph = (nodes: Node[], edges: Edge[], selectedWordId: string, depth: number) => {
  const resultNodeIds = new Set<string>()
  const resultEdges = new Set<Edge>()
  
  const nodeRelation = nodes.reduce<Record<string, [Edge, string][]>>((acc, node) => {
    acc[node.id] = []
    return acc
  }, {})
  edges.forEach(edge => {
    nodeRelation[edge.nodeId1].push([edge, edge.nodeId2])
    nodeRelation[edge.nodeId2].push([edge, edge.nodeId1])
  })

  let nodeQueue: string[] = [selectedWordId]
  for(let i=0;i<depth;i++) {
    const nextNodeQueue: string[] = []
    nodeQueue.forEach(nodeId => {
      nodeRelation[nodeId].forEach(([edge, nextNodeId]) => {
        resultEdges.add(edge)
        if(!resultNodeIds.has(nextNodeId)) {
          resultNodeIds.add(nextNodeId)
          nextNodeQueue.push(nextNodeId)
        }
      })
    })
    nodeQueue = nextNodeQueue
  }

  const resultNodeArray = nodes.filter(node => resultNodeIds.has(node.id))
  const resultEdgeArray = Array.from(resultEdges)

  return {
    nodes: resultNodeArray,
    edges: resultEdgeArray,
  }
}

export default createRelatedGraph
