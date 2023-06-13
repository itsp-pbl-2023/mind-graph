import { Edge, NodeGraph, Node } from "../components/common/NodeGraph"
import { ThemeDisplay } from "../components/common/ThemeDisplay"

const nodes = [
  {id: "a", word: "a"},
  {id: "b", word: "b"},
  {id: "c", word: "c"},
  {id: "d", word: "d"},
  {id: "e", word: "e"},
  {id: "f", word: "f"},
  {id: "g", word: "g"},
  {id: "h", word: "h"},
  {id: "i", word: "i"},
  {id: "j", word: "j"},
] as Node[]

const edges = [
  {nodeId1: "a", nodeId2: "b"},
  {nodeId1: "b", nodeId2: "c"},
  {nodeId1: "c", nodeId2: "d"},
  {nodeId1: "d", nodeId2: "a"},
  {nodeId1: "e", nodeId2: "f"},
  {nodeId1: "f", nodeId2: "g"},
  {nodeId1: "g", nodeId2: "h"},
  {nodeId1: "h", nodeId2: "a"},
  {nodeId1: "i", nodeId2: "j"},
  {nodeId1: "g", nodeId2: "j"},

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
  