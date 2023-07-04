import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import { getResult, setResult } from '../lib/state/result.ts'
import { useSetName } from '../lib/hooks/name.ts'
import { setUserID } from '../lib/state/user.ts'
import { useGraph } from '../lib/hooks/graph.ts'
import { useSetTheme } from '../lib/hooks/theme.ts'
import { useSetUsers } from '../lib/hooks/users.ts'
import { styled } from 'styled-components'
import { useUsers } from '../lib/hooks/users.ts'

const MVPBox = styled.p`
  color: black;
  background-color: #B2D8F5;
  border: 4px solid #B2D8F5;
  text-align: center;
  width: 300px;
  height: 250px;
  margin-left: 70px;

`

const ScoreBox = styled.p`
  color: black;
  background-color: white;
  border: 4px solid #B2D8F5;
  text-align: center;
  width: 300px;
  height: 250px;
  margin-left: 70px;
`

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
    <div>
      <h1>Result</h1>
      <ThemeDisplay />
      <p>This is the result page</p>
      <MVPBox>本日のMVPは...<br></br><br></br><br></br><h3 style={{fontSize:35}}>{mvpName}</h3></MVPBox>
      <div>{JSON.stringify(getResult())}</div>
      <div>{JSON.stringify(users)}</div>
      <ScoreBox>あなたのスコア<br></br><h3 style={{fontSize:60}}>{getResult()?.myScore}</h3></ScoreBox>
      <Button text='タイトルに戻る' onClick={returnToTitle} />
    </div>
  )
}

export default Result
  