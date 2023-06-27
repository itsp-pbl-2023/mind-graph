/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from "d3"
import { D3Edge, D3Node, NODE_WIDTH_D3ATTR_DEFAULT } from "./dataType"
import { Node as GraphNode, Edge } from "../api/api_pb"
import { updateNodeAttr } from "./calcNodeAttr"

// グラフの描画
export const GraphBuilder = (
  nodes: GraphNode[],
  edges: Edge[],
  width: number,
  height: number,
  onClick: (nodeId: string) => void = (() => null),
  focusedNodeId?: string,
) => {
  const mutableNodes = nodes.map<D3Node>(node => ({...node, ...NODE_WIDTH_D3ATTR_DEFAULT}))
  const nodeTable: Record<string, D3Node> = {}
  mutableNodes.forEach(node => {
    nodeTable[node.id] = node
  })
  const mutableEdges = edges.map<D3Edge>(edge => ({source: edge.nodeId1, target: edge.nodeId2}))

  // ノードのフォーカス設定
  if(focusedNodeId) {
    nodeTable[focusedNodeId].focused = true
  }

  // ノードの接続数を計算
  edges.forEach(edge => {
    nodeTable[edge.nodeId1].connectionCount++
    nodeTable[edge.nodeId2].connectionCount++
  });

  // 接続数から各種D3用の属性を計算
  mutableNodes.forEach(updateNodeAttr)

  // SVG Objects
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");
  const viewport = svg.append("g") 

  const edge = viewport.append("g")
      .attr("stroke", "#00f")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(mutableEdges)
    .join("line")
    .attr("stroke-width",10);
  const nodeWrapper = viewport.append("g")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 1.5)
  const node = nodeWrapper.selectAll("circle")
  .data(mutableNodes)
  .join("circle")
    .attr("r", d => d.radius)
    .attr("fill", (d) => d.focused ? "#f77" :"#faa")
    .attr("stroke", "#000")
    .attr("stroke-width", d => d.isSelected ? 3 : 1)
    .attr("style", "cursor: pointer;");
  
  const nodeText = nodeWrapper
    .selectAll("text")
    .data(mutableNodes)
    .join("text")
    // directly input svg text
    .html(d => d.wrappedText)
    .attr("width", 30)
    .attr("font-size", d => d.fontSize)
    .attr("stroke-width", 1.5)
    .attr("stroke", "#000")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("style", "width: 100px;cursor: pointer;user-select: none;pointer-events: none;");

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

  const forceManyConfig = d3.forceManyBody<D3Node>()
    .strength(d => -0.7 * d.radius * d.radius)
  
  const simulation = d3.forceSimulation(mutableNodes)
    .force("link", d3.forceLink<D3Node, D3Edge>(mutableEdges).id(d => d.id))
    .force("charge", forceManyConfig)
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", tick);
  
  
  // イベントの定義
  const zoom = (e: any) => {
    viewport.attr("transform", e.transform)
  }
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

  let previousSelectedNode: D3Node | null = null;
  const click = (_: any, d: D3Node) => {
    if (onClick) onClick(d.id)
    if (previousSelectedNode) previousSelectedNode.isSelected = false;
    d.isSelected = true;
    previousSelectedNode = d;
    
    // 選択を画面に反映
    node.attr("stroke-width", d => d.isSelected ? 3 : 1)
  }

  svg.call(d3.zoom<any, any>().on("zoom", zoom))

  node.call(d3.drag<any, D3Node>().on("start", dragstarted).on("drag", dragged).on("end", dragended))
  node.on("click", click)
  // nodeText.call(d3.drag<any, D3Node>().on("start", dragstarted).on("drag", dragged).on("end", dragended))
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