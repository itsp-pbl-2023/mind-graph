import { Edge, Node } from '../api/api_pb.ts'
import { GraphBuilder } from '../graph/graphBuilder.ts'
import { useEffect, useState } from 'react'

export const useGraphBuilder = (nodes: Node[], edges: Edge[], onShiftClick?: (gb: GraphBuilder, nodeId: string) => void): GraphBuilder | undefined => {
  const [graph, setGraph] = useState<GraphBuilder>()
  useEffect(() => {
    const gb = new GraphBuilder(window.innerWidth, window.innerHeight, onShiftClick)
    nodes.forEach(node => gb.addNode(node))
    edges.forEach(edge => gb.addEdge(edge))
    setGraph(gb)
    return () => setGraph(undefined)
  }, [nodes, edges, onShiftClick])
  return graph
}
