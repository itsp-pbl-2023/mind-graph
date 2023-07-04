

import UserList from '../components/userlistGaming.tsx'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import ExplainText from '../components/explainText'
import { client } from '../lib/client.ts'
import { useOnEvent } from '../lib/hooks/stream.ts'
import { useCallback, useState } from 'react'
import { setResult } from '../lib/state/result.ts'
import { useNavigate } from 'react-router-dom'
import { getUserID } from '../lib/state/user.ts'
import { NodeGraph } from '../components/common/NodeGraph.tsx'
import { useGraph } from '../lib/hooks/graph.ts'

const Voting = () => {
  const { nodes, edges } = useGraph()
  const [selectedNodeId, setSelectedNodeId] = useState<string>()

  const navigate = useNavigate()
  const userId = getUserID()
  const vote = async () => {
    if (!selectedNodeId) {
      alert('投票するノードをクリックして選択してください')
      return
    }
    console.log('vote', selectedNodeId)
    await client.voteWord({ nodeId: selectedNodeId, senderId: userId })
  }

  useOnEvent(useCallback((e) => {
    if (e.event.case !== 'result') return

    const evt = e.event.value
    setResult({
      chosenNodeID: evt.chosenNodeId,
      mvpUserID: evt.mvpUserId,
      myScore: evt.myScore,
    })
    navigate('/result')
  }, [navigate]))

  return (
    <div>
      <h1>Voting</h1>
      <ThemeDisplay />
      <p>This is the voting page</p>
      <UserList />

      <ExplainText
        elements={[
          'イイネ！と思ったノードを選び、投票ボタンを押す', 
        ]}
      />
      <NodeGraph nodes={nodes} edges={edges} onClick={setSelectedNodeId} />
      <button onClick={vote}>Vote</button>
    </div>
  )
}


export default Voting
  
