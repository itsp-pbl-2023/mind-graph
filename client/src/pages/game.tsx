import { NodeGraph } from "../components/common/NodeGraph"
import Timer from "../components/timer"
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import UserList from "../components/userlistGaming.tsx"
import { useOnEvent } from '../lib/hooks/stream.ts'
import { useCallback, useState } from 'react'
import Button from '../components/button.tsx'
import { client } from '../lib/client.ts'
import InputForm from "../components/input.tsx"
import ExplainText from "../components/explainText.tsx"
import { getUserID } from '../lib/state/user.ts'
import { useGraph } from '../lib/hooks/graph.ts'

const Game = () => {
  // ダミー変数

  const [expireDummy] = useState(new Date(new Date().getTime() + 5*1000))


  const [text, setText] = useState('')

  const send = async () => {
    if (text === '') return
    const res = await client.createNode({ word: text, creatorId: getUserID() })
    // 既存のノードが選択されている場合は接続
    if (selectedNode) client.createEdge({ nodeId1: selectedNode, nodeId2: res.id })
    setText('')
  }

  const { nodes, setNodes, edges, setEdges } = useGraph()

  useOnEvent(useCallback((event) => {
    switch (event.event.case) {
      case 'nodeUpdated': {
        const node = event.event.value.node;
        if (!node) return;

        setNodes((nodes) => [...nodes, node])
        break;
      }
      case 'edgeUpdated': {
        const edge = event.event.value.edge;
        if (!edge) return;
        
        setEdges((edges) => [...edges, edge])
        break;
      }
    }
  }, [setEdges, setNodes]))

  // ノード関連
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const onNodeClick = useCallback((node: string) => setSelectedNode(node), [])

  return (
    <div>
      <NodeGraph nodes={nodes} edges={edges} onClick={onNodeClick} />
      <ThemeDisplay />
      <h1>Game</h1>
      <p>This is the game page</p>
      <UserList />
      <ExplainText
        elements={[
          '単語を入力して送信ボタンを押す', 
          '右クリックして2つのノードを選び、接続する', 
        ]}
      />

      <Timer expire={expireDummy}></Timer>
      <div>
        <InputForm type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder="単語の入力"/>
        <Button text='送信' onClick={() => send()}/>
      </div>
    </div>
  )
}

export default Game
  