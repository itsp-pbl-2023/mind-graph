import { Node, Edge } from "../api/api_pb";

const createRelatedGraph = (
  nodes: Node[],
  edges: Edge[],
  selectedWordId: string | undefined,
  depth: number
): {
  nodes: Node[],
  edges: Edge[],
} => {
  // 選択されたノードが不正な場合には空のグラフを返す
  if (!selectedWordId) return {nodes: [], edges: []}
  
  const resultNodeIds = new Set<string>()
  const resultEdges = new Set<Edge>()
  
  const nodeRelation = Object.fromEntries(nodes.map(node => [node.id, [] as [Edge, string][]]))
  edges.forEach(edge => {
    nodeRelation[edge.nodeId1].push([edge, edge.nodeId2])
    nodeRelation[edge.nodeId2].push([edge, edge.nodeId1])
  })

  resultNodeIds.add(selectedWordId)
  
  // depth数だけ幅優先探索
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
