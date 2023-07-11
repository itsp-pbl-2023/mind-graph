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
import { styled } from "styled-components"

const StyledGame = styled.div`
  display: flex;
`

const StyledColumn = styled.div`
  position: relative;
  z-index: 10;
  pointer-events: none;
  width: 33.3333vw;
`

const StyledAddWord = styled.div`
  position: fixed;
  bottom: 0;
  justify-content: center;
`

import { useGraph } from '../lib/hooks/graph.ts'

const Game = () => {
  // ダミー変数
  const [expireDummy] = useState(new Date(new Date().getTime() + 30*1000))


  const [text, setText] = useState('')

  const send = async () => {
    if (text === '') return
    const res = await client.createNode({ word: text, creatorId: getUserID() })
    // 既存のノードが選択されている場合は接続
    if (selectedNode) client.createEdge({ nodeId1: selectedNode, nodeId2: res.id, creatorId: getUserID() })
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
    <StyledGame>
      <NodeGraph nodes={nodes} edges={edges} onClick={onNodeClick} />
      <StyledColumn>
        <UserList />
      </StyledColumn>
      <StyledColumn>
        <ThemeDisplay />
        <StyledAddWord>
          <InputForm type='text' value={text} onChange={(e) => setText(e.target.value)} />
          <Button text='Add Word' onClick={() => send()} />
        </StyledAddWord>
      </StyledColumn>
      <StyledColumn>
        <Timer expire={expireDummy}></Timer>
        <ExplainText
        elements={[
          '単語を入力して送信ボタンを押す', 
          '右クリックして2つのノードを選び、接続する', 
        ]}
      />
      </StyledColumn>
    </StyledGame>
  )
}

export default Game
  