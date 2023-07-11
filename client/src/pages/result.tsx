import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import { NodeGraph } from '../components/common/NodeGraph.tsx'
import { useMemo } from 'react'
import createRelatedGraph from '../lib/graph/createRelatedGraph.ts'
import { getResult, setResult } from '../lib/state/result.ts'
import ShowWord from '../components/showWord.tsx'
import { useSetName } from '../lib/hooks/name.ts'
import { setUserID } from '../lib/state/user.ts'
import { useGraph } from '../lib/hooks/graph.ts'
import { useSetTheme } from '../lib/hooks/theme.ts'
import { useSetUsers } from '../lib/hooks/users.ts'
import { useSetVoted } from '../lib/hooks/voted.ts'
import { useUsers } from '../lib/hooks/users.ts'
import MVPBox from '../components/MVPBox.tsx'
import ScoreBox from '../components/ScoreBox.tsx'
import styled from "styled-components"

const ReturnButton = styled.div`
  text-align: left;
  left:200px; 
  top:630px; 
  position:absolute;

`

const ShowResult = styled.div`
  text-align:center;
  top:0px;
  left:650px;
  position:absolute;
  width: 50%;
`

const WordBox = styled.div`
  display: inline-block;
  text-align:center;
`

const Result = () => {
  const { nodes, edges } = useGraph()
  const chosenNodeId = getResult()?.chosenNodeID
  const chosenNode = nodes.find((node) => node.id == chosenNodeId)
  if ( typeof(chosenNode) == undefined ){
    console.log("chosenNode Undefined");
  }

  const navigate = useNavigate()
  const setName = useSetName()
  const setTheme = useSetTheme()
  const setUsers = useSetUsers()
  const setVoted = useSetVoted()
  const { setEdges, setNodes } = useGraph()

  const returnToTitle = () => {
    setName(undefined) // disconnect
    setEdges([])
    setNodes([])
    setTheme(undefined)
    setUsers([])
    setVoted([])
    setResult(undefined)
    setUserID(undefined)
    navigate('/')
  }

  const users = useUsers();
  const mvp = users.find(item => item.id === getResult()?.mvpUserID);
  const mvpName = mvp?.name;

  const { nodes: relatedNodes, edges: relatedEdges } = useMemo(() => createRelatedGraph(nodes, edges, chosenNodeId, 3), [nodes, edges, chosenNodeId])

  return (
    <div  style={{minWidth:'1200px'}}>
      <NodeGraph nodes={relatedNodes} edges={relatedEdges} focusedNodeId={chosenNodeId || undefined} />   
      <ShowResult>
        <ThemeDisplay />
        <WordBox>
          <ShowWord word={chosenNode?.word} />
        </WordBox>
      </ShowResult>
      <MVPBox>本日のMVPは...<span style={{display:'block', fontSize:40, fontWeight:'bold', padding:'50px', overflowWrap:'break-word'}}>{mvpName}</span></MVPBox>
      <ScoreBox>あなたのスコア<span style={{fontSize:60, fontWeight:'bold', display:'block', padding:'50px'}}>{getResult()?.myScore}</span></ScoreBox>
      <ReturnButton><Button text='タイトルに戻る' onClick={returnToTitle} /></ReturnButton>
   
    </div>
  )
}

export default Result
  