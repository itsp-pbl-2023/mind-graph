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
import { Graph } from '../lib/hooks/graph.tsx'
import { GraphBuilder } from '../lib/graph/graphBuilder.ts'
import { useGraphBuilder } from '../lib/hooks/graphBuilder.ts'
import { useGraph } from '../lib/hooks/graph.ts'

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
  z-index: 10;
  pointer-events: all;
  left: 50vw;
  transform: translate(-50%, -50%);

`

const Game = () => {
  // ダミー変数
  const [expireDummy] = useState(new Date(new Date().getTime() + 60*1000))

  const [text, setText] = useState('')

  const send = async () => {
    if (text === '') return
    const res = await client.createNode({ word: text, creatorId: getUserID() })
    // 既存のノードが選択されている場合は接続
    const selectedNode = gb?.getSelectedNode()
    if (selectedNode) client.createEdge({ nodeId1: selectedNode, nodeId2: res.id, creatorId: getUserID() })
    setText('')
  }

  const { nodes, addNode, edges, addEdge } = useGraph()
  const onNodeShiftClick = useCallback((gb: GraphBuilder, nodeId: string) => {
    const selectedNode = gb.getSelectedNode()
    client.createEdge({ nodeId1: selectedNode, nodeId2: nodeId, creatorId: getUserID() })
  }, [])
  const gb = useGraphBuilder(nodes, edges,onNodeShiftClick)

  useOnEvent(useCallback((event) => {
    switch (event.event.case) {
      case 'nodeUpdated': {
        const node = event.event.value.node;
        if (!node) return;
        addNode(node)
        gb?.addNode(node)
        break;
      }
      case 'edgeUpdated': {
        const edge = event.event.value.edge;
        if (!edge) return;
        addEdge(edge)
        gb?.addEdge(edge)
        break;
      }
    }
  }, [gb, addNode, addEdge]))

  return (
    <StyledGame>
      <Graph gb={gb} />
      <StyledColumn>
        <UserList />
      </StyledColumn>
      <StyledColumn>
        <ThemeDisplay />
      </StyledColumn>
      <StyledColumn>
        <Timer expire={expireDummy}></Timer>
        <ExplainText
        elements={[
          'グラフを作ろう！',
          '単語を入力して送信ボタンを押す', 
          '右クリックして2つのノードを選び、接続する', 
        ]}
      />
      </StyledColumn>
      <StyledAddWord>
          <InputForm type='text' value={text} onChange={(e) => setText(e.target.value)} />
          <Button text='Add Word' onClick={() => send()} />
        </StyledAddWord>
    </StyledGame>
  )
}

export default Game
  