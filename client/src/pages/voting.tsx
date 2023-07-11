import UserList from '../components/userlistVoting.tsx'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import ExplainText from '../components/explainText'
import { client } from '../lib/client.ts'
import { useOnEvent } from '../lib/hooks/stream.ts'
import { useCallback, useState } from 'react'
import { setResult } from '../lib/state/result.ts'
import { useNavigate } from 'react-router-dom'
import { getUserID } from '../lib/state/user.ts'
import { useSetVoted } from '../lib/hooks/voted.ts'
import Button from '../components/button.tsx'
import { styled } from 'styled-components'
import { Graph } from '../lib/hooks/graph.tsx'
import { useGraph } from '../lib/hooks/graph.ts'
import { useGraphBuilder } from '../lib/hooks/graphBuilder.ts'

const LayoutUserList = styled.div`
  position: fixed;
  left: 0;
  z-index: 10;
`

const LayoutThemeDisplay = styled.div`
  position: fixed;
  top: 0;
  left:50%;
  transform: translate(-50%, 0);
  z-index: 10;
`

const LayoutButton = styled.div`
  position: fixed;
  bottom: 0;
  left:50%;
  transform: translate(-50%, -50%);

  pointer-events: all;
  z-index: 10;
`

const Voting = () => {
  const { nodes, edges } = useGraph()
  const gb = useGraphBuilder(nodes, edges)

  const navigate = useNavigate()
  const userId = getUserID()
  const setVoted = useSetVoted()
  const vote = async () => {
    const selectedNodeId = gb?.getSelectedNode()
    if (!selectedNodeId) {
      alert('投票するノードをクリックして選択してください')
      return
    }
    console.log('vote', selectedNodeId)
    await client.voteWord({ nodeId: selectedNodeId, senderId: userId })
    setIsVoted(true)
  }

  useOnEvent(useCallback((e) => {
    if (e.event.case == 'voteProgress'){
      setVoted(e.event.value.finishedUserIds.map(item => (item)))
    }
    if (e.event.case !== 'result') return

    const evt = e.event.value
    setResult({
      chosenNodeID: evt.chosenNodeId,
      mvpUserID: evt.mvpUserId,
      myScore: evt.myScore,
    })
    navigate('/result')
  }, [setVoted,navigate]))

  const [isVoted, setIsVoted] = useState(false);

  return (
    <div>
      <LayoutThemeDisplay>
        <ThemeDisplay />
      </LayoutThemeDisplay>
      <LayoutUserList>
        <UserList />
      </LayoutUserList>

      <ExplainText
        elements={[
          '投票しよう',
          'イイネ！と思ったノードを選び、投票ボタンを押す', 
        ]}
      />
      <Graph gb={gb} />
      <LayoutButton>
        <Button text={isVoted ? "投票済" : "投票"} onClick={vote} disabled={isVoted}></Button>
      </LayoutButton>
    </div>
  )
}


export default Voting
  
