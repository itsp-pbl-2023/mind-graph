import UserList from '../components/userlist'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import { client } from '../lib/client.ts'
import { useOnEvent } from '../lib/hooks/stream.ts'
import { useCallback } from 'react'
import { setResult } from '../lib/state/result.ts'
import { useNavigate } from 'react-router-dom'
import { getUserID } from '../lib/state/user.ts'

const Voting = () => {
  const navigate = useNavigate()
  const vote = async (nodeID: string) => {
    await client.voteWord({ nodeId: nodeID })
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
      {/* TODO: ノードを選択して投票できるようにする */}
      <button onClick={() => vote(getUserID())}>Vote</button>
    </div>
  )
}


export default Voting
  
