import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import { useEffect, useMemo } from 'react'
import createRelatedGraph from '../lib/graph/createRelatedGraph.ts'
import { getResult, setResult } from '../lib/state/result.ts'
import ShowWord from '../components/showWord.tsx'
import { useSetName } from '../lib/hooks/name.ts'
import { setUserID } from '../lib/state/user.ts'
import { useSetTheme } from '../lib/hooks/theme.ts'
import { useSetUsers } from '../lib/hooks/users.ts'
import { useSetVoted } from '../lib/hooks/voted.ts'
import { useUsers } from '../lib/hooks/users.ts'
import MVPBox from '../components/MVPBox.tsx'
import ScoreBox from '../components/ScoreBox.tsx'
import styled from "styled-components"
import { Graph } from '../lib/hooks/graph.tsx'
import { useGraph } from '../lib/hooks/graph.ts'
import { useGraphBuilder } from '../lib/hooks/graphBuilder.ts'

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
  const { nodes, edges, reset: resetGraph } = useGraph()
  const chosenNodeId = getResult()?.chosenNodeID
  const chosenNode = nodes.find((node) => node.id == chosenNodeId)
  const { nodes: relatedNodes, edges: relatedEdges } = useMemo(() => {
    return createRelatedGraph(nodes, edges, chosenNodeId, 3)
  }, [nodes, edges, chosenNodeId])
  const gb = useGraphBuilder(relatedNodes, relatedEdges)
  useEffect(() => {
    if (gb && chosenNodeId) gb.setFocusedNode(chosenNodeId)
  }, [gb, chosenNodeId])

  const navigate = useNavigate()
  const setName = useSetName()
  const setTheme = useSetTheme()
  const setUsers = useSetUsers()
  const setVoted = useSetVoted()

  const returnToTitle = () => {
    setName(undefined) // disconnect
    resetGraph()
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


  return (
    <div  style={{minWidth:'1200px'}}>
      <Graph gb={gb} />
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
  