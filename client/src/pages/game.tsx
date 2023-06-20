import { NodeGraph } from "../components/common/NodeGraph"
import { ThemeDisplay } from "../components/common/ThemeDisplay"
import Timer from "../components/timer"
import UserList from "../components/userlist"
import { useOnEvent } from '../lib/hooks/stream.ts'
import { useCallback, useState } from 'react'
import Button from '../components/button.tsx'
import { client } from '../lib/client.ts'
// import { useName } from '../lib/hooks/name.ts'
import ExplainText from "../components/explainText.tsx"
import { Node, Edge } from "../lib/api/api_pb.ts"
import { getUserID } from '../lib/state/user.ts'

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

const Game = () => {

  // ダミー変数
  // 読み込んでから60秒
  const [expireDummy] = useState(new Date(new Date().getTime() + 1000*1000))

  const [text, setText] = useState('')

  const send = () => {
    if (text === '') return
    client.createNode({ word: text, creatorId: getUserID() })
    setText('')
  }

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
  }, []))



  // ノード関連
  const [nodes, setNodes] = useState<Node[]>(dummyNodes)
  const [edges, setEdges] = useState<Edge[]>(dummyEdges)
  const onNodeClick = useCallback((node: string) => console.log(`node ${node} is selected`), [])

  return (
    <div>
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
        <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
        <Button text='Add Word' onClick={() => send()} />
      </div>
      <NodeGraph nodes={nodes} edges={edges} onClick={onNodeClick} />
    </div>
  )
}

export default Game
  