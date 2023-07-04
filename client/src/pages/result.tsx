import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import { getResult, setResult } from '../lib/state/result.ts'
import ShowWord from '../components/showWord.tsx'
import { useSetName } from '../lib/hooks/name.ts'
import { useGraph } from '../lib/hooks/graph.ts'
import { setUserID } from '../lib/state/user.ts'
import { useSetTheme } from '../lib/hooks/theme.ts'
import { useSetUsers } from '../lib/hooks/users.ts'

const Result = () => {
  const { nodes } = useGraph()
  const chosenNodeId = getResult()?.chosenNodeID
  const chosenNode = nodes.find((node) => node.id == chosenNodeId)
  if ( typeof(chosenNode) == undefined ){
    console.log("chosenNode Undefined");
  }

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

  return (
    <div>
      <h1>Result</h1>
      <ThemeDisplay />
      <p>This is the result page</p>

      <ShowWord word={chosenNode?.word} />

      <Button text='タイトルに戻る' onClick={returnToTitle} />
    </div>
  )
}

export default Result
  