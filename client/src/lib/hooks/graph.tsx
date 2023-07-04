import { Edge, Node } from '../api/api_pb.ts'
import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react'

type GraphContextType = {
  nodes: Node[]
  setNodes: Dispatch<SetStateAction<Node[]>>
  edges: Edge[]
  setEdges: Dispatch<SetStateAction<Edge[]>>
}

export const GraphContext = createContext<GraphContextType>({
  nodes: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNodes: () => {},
  edges: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEdges: () => {},
})

export interface GraphProviderProps {
  children: ReactNode
}

export const GraphProvider = ({ children }: GraphProviderProps) => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const value = useMemo(() => {
    return { nodes, setNodes, edges, setEdges }
  }, [nodes, setNodes, edges, setEdges])
  return (
    <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
  )
}
