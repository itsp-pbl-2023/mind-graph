import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import { getResult } from '../lib/state/result.ts'
import { NodeGraph } from '../components/common/NodeGraph.tsx'
import { useMemo } from 'react'
import { useGraph } from '../lib/hooks/graph.ts'
import createRelatedGraph from '../lib/graph/createRelatedGraph.ts'

const Result = () => {
  const navigate = useNavigate()
  const returnToTitle = () => {
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
  