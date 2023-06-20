import { Edge, NodeGraph, Node } from "../components/common/NodeGraph"
import { ThemeDisplay } from "../components/common/ThemeDisplay"
import Timer from "../components/timer"
import UserList from "../components/userlist"
import { useOnEvent } from '../lib/hooks/stream.ts'
import { useCallback, useState } from 'react'
import Button from '../components/button.tsx'
import { client } from '../lib/client.ts'
import { useName } from '../lib/hooks/name.ts'
import styled from 'styled-components'

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

  const name = useName()
  const [text, setText] = useState('')

  const send = () => {
    if (text === '') return
    client.createNode({ word: text, creatorId: name })
    setText('')
  }

  useOnEvent(useCallback((event) => {
    console.log(`new event ${event.event.case}`)
    console.log(event)
  }, []))

  const explainBox = styled.p`
    border: 1px solid #000;
  `

  // ノード関連
  const [nodes, setNodes] = useState<Node[]>(dummyNodes)
  const [edges, setEdges] = useState<Edge[]>(dummyEdges)

  return (
    <div>
      <ThemeDisplay />
      <h1>Game</h1>
      <p>This is the game page</p>
      <UserList />
      <Timer expire={expireDummy}></Timer>
      <div>
        <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
        <Button text='Add Word' onClick={() => send()} />
      </div>
      <NodeGraph nodes={nodes} edges={edges} onClick={(node: string) => console.log(`node ${node} is selected`)} />
    </div>
  )
}

export default Game
  