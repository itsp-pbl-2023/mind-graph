import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Edge, Node } from '../api/api_pb.ts'
import { GraphBuilder } from '../graph/graphBuilder.ts'

type GraphContextType = {
  nodes: Node[]
  addNode: (node: Node) => void
  edges: Edge[]
  addEdge: (edge: Edge) => void
  reset: () => void
}

export const GraphContext = createContext<GraphContextType>({
  nodes: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addNode: () => {},
  edges: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addEdge: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reset: () => {},
})

export interface GraphProviderProps {
  children: ReactNode
}

export const GraphProvider = ({ children }: GraphProviderProps) => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const value = useMemo(() => {
    return {
      nodes,
      addNode: (node: Node) => setNodes(nodes => {
        nodes.push(node)
        return nodes
      }),
      edges,
      addEdge: (edge: Edge) => setEdges(edges => {
        edges.push(edge)
        return edges
      }),
      reset: () => {
        setNodes([])
        setEdges([])
      }
    }
  }, [nodes, setNodes, edges, setEdges])
  return (
    <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
  )
}

export const GraphWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
`

export const useGraph = () => useContext(GraphContext)

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

export const Graph: FC<{ gb?: GraphBuilder }> = ({ gb }) => {
  const graphWrapperRef = useRef<HTMLDivElement>(null)
  const svg = gb?.getSVG()
  useEffect(() => {
    const cur = graphWrapperRef.current
    if (cur && svg) {
      cur.appendChild(svg)
      return () => {
        cur.removeChild(svg)
      }
    }
  }, [graphWrapperRef, svg])
  return (
    <GraphWrapper ref={graphWrapperRef} />
  )
}
