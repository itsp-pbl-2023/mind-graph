import { Edge, NodeGraph, Node } from "../components/common/NodeGraph"
import { ThemeDisplay } from "../components/common/ThemeDisplay"

const nodes = [
  {id: "a", word: "a"},
  {id: "b", word: "b"},
  {id: "c", word: "c"},
  {id: "d", word: "d"},
] as Node[]

const edges = [
  {nodeId1: "a", nodeId2: "b"},
  {nodeId1: "b", nodeId2: "c"},
  {nodeId1: "c", nodeId2: "d"},
  {nodeId1: "d", nodeId2: "a"},
] as Edge[]

const Game = () => {
    return (
      <div>
        <ThemeDisplay />
        <h1>Game</h1>
        <p>This is the game page</p>
        <NodeGraph nodes={nodes} edges={edges} />
      </div>
    )
  }
  
  export default Game
  