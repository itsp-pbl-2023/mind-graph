/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from "d3"

// gRPC互換の型
// TODO: gRPC実装後に消す
interface Node {
  id: string
  word: string
  creatorId: string
}

// connection
interface NodeWithConnection {
  connectionCount: number
}

interface Edge {
  nodeId1: string
  nodeId2: string
}

type D3Node = d3.SimulationNodeDatum & Node & NodeWithConnection
type D3Edge = d3.SimulationLinkDatum<D3Node>

// テキストの幅を計算するためにcanvasを使う
const canvasForCalcTextWidth = document.createElement("canvas")
const ctxForCalcTextWidth = canvasForCalcTextWidth.getContext("2d")!

const calculateTextWidth = (text: string, fontSize: number) => {
  ctxForCalcTextWidth.font = `${fontSize}px sans-serif`
  return ctxForCalcTextWidth.measureText(text).width
}

const calculateFontSizeFromConnection = (connectionCount: number) => {
  const minFontSize = 10
  const maxFontSize = 30
  const minConnectionCount = 1
  const maxConnectionCount = 10
  const fontSize = (maxFontSize - minFontSize) * (connectionCount - minConnectionCount) / (maxConnectionCount - minConnectionCount) + minFontSize
  return fontSize
}

// グラフの描画
export const GraphBuilder = (nodes: Node[], edges: Edge[], width: number, height: number) => {
  const mutableNodes = nodes.map(node => ({...node, connectionCount: 0}) as D3Node)
  const nodeTable: Record<string, D3Node> = {}
  mutableNodes.forEach(node => {
    nodeTable[node.id] = node
  })
  const mutableEdges = edges.map(edge => ({source: edge.nodeId1, target: edge.nodeId2}) as D3Edge)

  // ノードの接続数を計算
  edges.forEach(edge => {
    nodeTable[edge.nodeId1].connectionCount++
    nodeTable[edge.nodeId2].connectionCount++
  });



  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add a line for each link, and a circle for each node.
  const edge = svg.append("g")
      .attr("stroke", "#00f")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(mutableEdges)
    .join("line")
    . attr("stroke-width",10);

  // const node = svg.append("g")
  //   .attr("stroke", "#aaa")
  //   .attr("stroke-width", 1.5)
  // .selectAll("circle")
  // .data(mutableNodes)
  // .join("circle")
  //   .attr("r", d => calculateTextWidth(d.word, 10) / 2 + 10)
  //   .attr("fill", "#faa")
  const node = svg.append("g")
  .attr("stroke", "#00f")
  .attr("stroke-opacity", 0.6)
  .selectAll("circle")
  .data(mutableNodes)
  .join("circle")
    .attr("r", d => calculateTextWidth(d.word, calculateFontSizeFromConnection(d.connectionCount)) / 2 + 10)
    .attr("fill", "#faa")
    .attr("stroke", "#000")
    .attr("stroke-width", 1.5)
    .attr("style", "cursor: pointer;pointer-events: none;");
  
  const nodeText = svg.append("g")
  .attr("stroke", "#000")
  .attr("stroke-width", 1)
  .selectAll("text")
  .data(mutableNodes)
  .join("text")
    .text(d => d.word)
    .attr("font-size", d => calculateFontSizeFromConnection(d.connectionCount))
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("style", "cursor: pointer;user-select: none;");

  node.append("title").text(d => d.word);
    
  const tick = () => {
    edge
      .attr("x1", (d) => (d.source as D3Node).x as number)
      .attr("y1", (d) => (d.source as D3Node).y as number)
      .attr("x2", (d) => (d.target as D3Node).x as number)
      .attr("y2", (d) => (d.target as D3Node).y as number);

    node
      .attr("cx", (d) => d.x as number)
      .attr("cy", (d) => d.y as number)
    nodeText
      .attr("x", (d) => d.x as number)
      .attr("y", (d) => d.y as number);
  }
  
  const simulation = d3.forceSimulation(mutableNodes)
    .force("link", d3.forceLink<D3Node, D3Edge>(mutableEdges).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", tick);
  
  const dragstarted = (event: any, d: D3Node) => {

    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  const dragged = (event: any, d: D3Node) => {
    d.fx = event.x;
    d.fy = event.y;
  }

  const dragended = (event: any, d: D3Node) => {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  node.call(d3.drag<any, D3Node>().on("start", dragstarted).on("drag", dragged).on("end", dragended))
  nodeText.call(d3.drag<any, D3Node>().on("start", dragstarted).on("drag", dragged).on("end", dragended))
  // node.call(d3.drag<Element, D3Node>()
  //   .on("start", dragstarted)
  //   .on("drag", dragged)
  //   .on("end", dragended), []);


  return {
    svg,
    dispose() {
      simulation.stop()
    }
  }
}