import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import { getResult, setResult } from '../lib/state/result.ts'
import { useSetName } from '../lib/hooks/name.ts'
import { setUserID } from '../lib/state/user.ts'
import { useGraph } from '../lib/hooks/graph.ts'
import { useSetTheme } from '../lib/hooks/theme.ts'
import { useSetUsers } from '../lib/hooks/users.ts'
import { useUsers } from '../lib/hooks/users.ts'
import MVPBox from '../components/MVPBox.tsx'
import ScoreBox from '../components/ScoreBox.tsx'

const Result = () => {
  const navigate = useNavigate()
  const setName = useSetName()
  const setTheme = useSetTheme()
  const setUsers = useSetUsers()
  const { setEdges, setNodes } = useGraph()

  const returnToTitle = () => {
    setName(undefined) // disconnect
    setEdges([])
    setNodes([])
    setTheme(undefined)
    setUsers([])
    setResult(undefined)
    setUserID(undefined)
    navigate('/title')
  }

  const users = useUsers();
  const mvp = users.find(item => item.id === getResult()?.mvpUserID);
  const mvpName = mvp?.name;

  return (
    <div style={{minWidth:'1200px'}}>
      <h1>Result</h1>
      <ThemeDisplay />
      <p>This is the result page</p>
      <MVPBox>本日のMVPは...<span style={{fontSize:60, fontWeight:'bold', display:'block', padding:'50px'}}>{mvpName}</span></MVPBox>
      <ScoreBox>あなたのスコア<span style={{fontSize:60, fontWeight:'bold', display:'block', padding:'50px'}}>{getResult()?.myScore}</span></ScoreBox>
      <Button text='タイトルに戻る' onClick={returnToTitle} />
    </div>
  )
}

export default Result
  