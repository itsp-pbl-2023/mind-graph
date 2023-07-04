import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import { NodeGraph } from '../components/common/NodeGraph.tsx'
import { useMemo } from 'react'
import createRelatedGraph from '../lib/graph/createRelatedGraph.ts'
import { getResult, setResult } from '../lib/state/result.ts'
import { useSetName } from '../lib/hooks/name.ts'
import { setUserID } from '../lib/state/user.ts'
import { useGraph } from '../lib/hooks/graph.ts'
import { useSetTheme } from '../lib/hooks/theme.ts'
import { useSetUsers } from '../lib/hooks/users.ts'

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

  const result = getResult()

  const chosenNodeId = result ? result.chosenNodeID : null

  const { nodes, edges } = useGraph()
  const { nodes: relatedNodes, edges: relatedEdges } = useMemo(() => createRelatedGraph(nodes, edges, chosenNodeId, 3), [nodes, edges, chosenNodeId])

  return (
    <div>
      <NodeGraph nodes={relatedNodes} edges={relatedEdges} focusedNodeId={chosenNodeId || undefined} />
      <h1>Result</h1>
      <ThemeDisplay />
      <p>This is the result page</p>
      <div>{JSON.stringify(getResult())}</div>
      <Button text='タイトルに戻る' onClick={returnToTitle} />
    </div>
  )
}

export default Result
  