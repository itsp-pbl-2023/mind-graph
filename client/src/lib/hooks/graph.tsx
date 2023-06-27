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
  const [nodes, setNodes] = useState<Node[]>(dummyNodes)
  const [edges, setEdges] = useState<Edge[]>(dummyEdges)
  const value = useMemo(() => {
    return { nodes, setNodes, edges, setEdges }
  }, [nodes, setNodes, edges, setEdges])
  return (
    <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
  )
}

// TODO: remove test data

const dummyNodes = [
  {id: "a", word: "これは"},
  {id: "b", word: "テストの"},
  {id: "c", word: "ノードグラフ"},
  {id: "d", word: "になっています"},
  {id: "e", word: "ドラッグアンドドロップして"},
  {id: "f", word: "グラフを"},
  {id: "g", word: "変形してみよう"},
  {id: "h", word: "これはなんかすごく長いノードのテスト"},
  {id: "i", word: "ﾜｧ..!"},
  {id: "j", word: "( ﾟДﾟ)"},
] as Node[]

const dummyEdges = [
  {nodeId1: "a", nodeId2: "b"},
  {nodeId1: "b", nodeId2: "c"},
  {nodeId1: "c", nodeId2: "d"},
  {nodeId1: "d", nodeId2: "a"},
  {nodeId1: "f", nodeId2: "e"},
  {nodeId1: "f", nodeId2: "g"},
  {nodeId1: "g", nodeId2: "h"},
  {nodeId1: "h", nodeId2: "a"},
  {nodeId1: "i", nodeId2: "j"},
  {nodeId1: "g", nodeId2: "j"},
] as Edge[]
