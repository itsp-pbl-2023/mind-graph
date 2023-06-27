import { NodeGraph } from "../components/common/NodeGraph"
import { ThemeDisplay } from "../components/common/ThemeDisplay"
import Timer from "../components/timer"
import UserList from "../components/userlist"
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
  grid-template-columns: repeat(3, 1fr);
`

const StyledColumn = styled.div`
  display: block;
`
import { useGraph } from '../lib/hooks/graph.ts'

const Game = () => {
  // ダミー変数
  const [expireDummy] = useState(new Date(new Date().getTime() + 5*1000000))

  const [text, setText] = useState('')

  const send = () => {
    if (text === '') return
    client.createNode({ word: text, creatorId: getUserID() })
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

  const onNodeClick = useCallback((node: string) => console.log(`node ${node} is selected`), [])

  return (
    <StyledGame>
      <StyledColumn>
        <UserList />
      </StyledColumn>
      <StyledColumn>
        <h1>Game</h1>
        <ThemeDisplay />
        <NodeGraph nodes={nodes} edges={edges} onClick={onNodeClick} />
        <div>
          <InputForm type='text' value={text} onChange={(e) => setText(e.target.value)} />
          <Button text='Add Word' onClick={() => send()} />
        </div>
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
  