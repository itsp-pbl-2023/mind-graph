/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from "d3"
import { D3Edge, D3Node, NODE_WIDTH_D3ATTR_DEFAULT } from "./dataType"
import { Node as GraphNode, Edge } from "../api/api_pb"
import { updateNodeAttr } from "./calcNodeAttr"

export class GraphBuilder {
  private width: number
  private height: number

  // グラフの元データ
  private nodes: D3Node[] = []
  private nodeTable: Record<string, D3Node> = {}
  private edges: D3Edge[] = []

  // svg系
  private svg: d3.Selection<SVGSVGElement, undefined, null, undefined>
  private viewportSVG: d3.Selection<SVGGElement, undefined, null, undefined>
  private edgeSVG: d3.Selection<d3.BaseType | SVGLineElement, D3Edge, SVGGElement, undefined>
  private nodeWrapperSVG: d3.Selection<SVGGElement, undefined, null, undefined>
  private nodeSVG: d3.Selection<d3.BaseType | SVGCircleElement, D3Node, SVGGElement, undefined>
  private nodeTextSVG: d3.Selection<d3.BaseType | SVGTextElement, D3Node, SVGGElement, undefined>

  // シミュレーション系
  private simulation: d3.Simulation<D3Node, D3Edge>

  // イベント系
  private previousSelectedNodeId: string | undefined
  private shiftKeyIsPressed = false

  private onShiftClick: ((gb: GraphBuilder, nodeId: string) => void) | undefined

  constructor(width: number, height: number, onShiftClick?: (gb: GraphBuilder, nodeId: string) => void) {
    this.width = width
    this.height = height

    this.onShiftClick = onShiftClick

    this.svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;")

    this.viewportSVG = this.svg.append("g")

    this.edgeSVG = this.viewportSVG.append("g")
      .attr("stroke", "#00f")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(this.edges)
    .join("line")
    .attr("stroke-width",10)

    this.nodeWrapperSVG = this.viewportSVG.append("g")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 1.5)

    this.nodeSVG = this.nodeWrapperSVG.selectAll("circle")
    .data(this.nodes)
    .join("circle")
      .attr("r", d => d.radius)
      .attr("fill", (d) => d.focused ? "#f77" :"#faa")
      .attr("stroke", "#000")
      .attr("stroke-width", d => d.isSelected ? 3 : 1)
      .attr("style", "cursor: pointer;");

    this.nodeTextSVG = this.nodeWrapperSVG
    .selectAll("text")
    .data(this.nodes)
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

    this.nodeSVG.append("title").text(d => d.id);

    const forceManyConfig = d3.forceManyBody<D3Node>()
    .strength(d => -0.7 * d.radius * d.radius)

    this.simulation = d3.forceSimulation(this.nodes)
      .force("link", d3.forceLink<D3Node, D3Edge>(this.edges).id(d => d.id))
      .force("charge", forceManyConfig)
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", this.tick.bind(this));

    this.svg.call(d3.zoom<any, any>().on("zoom", this.onZoom.bind(this)))

    this.nodeSVG.call(d3.drag<any, D3Node>().on("start", this.onDragStart.bind(this)).on("drag", this.onDragged.bind(this)).on("end", this.onDragEnd.bind(this)))

    this.nodeSVG.on("click", this.onClickHandler.bind(this))
    
    window.addEventListener("resize", this.onResize)
    window.addEventListener("keydown", this.onKeyDown)
    window.addEventListener("keyup", this.onKeyUp)
  }

  public addNode(newNode: GraphNode) {
    const d3Node = {...newNode, ...NODE_WIDTH_D3ATTR_DEFAULT}
    this.nodes.push(d3Node)
    this.nodeTable[d3Node.id] = d3Node
    updateNodeAttr(d3Node)

    this.nodeSVG = this.nodeWrapperSVG.selectAll("circle")
        .data(this.nodes)
      .join("circle")
        .attr("r", d => d.radius)
        .attr("fill", (d) => d.focused ? "#f77" :"#faa")
        .attr("stroke", "#000")
        .attr("stroke-width", d => d.isSelected ? 3 : 1)
        .attr("style", "cursor: pointer;")
        .merge(this.nodeSVG)
    this.nodeSVG.append("title").text(d => d.id)
    this.nodeSVG.on("click", this.onClickHandler)
    
    this.nodeSVG.call(d3.drag<any, D3Node>().on("start", this.onDragStart.bind(this)).on("drag", this.onDragged.bind(this)).on("end", this.onDragEnd.bind(this)))

    this.nodeSVG.on("click", this.onClickHandler.bind(this))
    
    this.nodeTextSVG = this.nodeWrapperSVG
      .selectAll("text")
      .data(this.nodes)
    .join("text")
      // directly input svg text
      .html(d => d.wrappedText)
      .attr("width", 30)
      .attr("font-size", d => d.fontSize)
      .attr("stroke-width", 1.5)
      .attr("stroke", "#000")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("style", "width: 100px;cursor: pointer;user-select: none;pointer-events: none;")
    .merge(this.nodeTextSVG)

    this.simulation.nodes(this.nodes)
    ;(this.simulation.force("link") as d3.ForceLink<D3Node, D3Edge>).links(this.edges)
    this.simulation.restart()
  }

  public addEdge(newEdge: Edge) {
    const d3Edge = { source: newEdge.nodeId1, target: newEdge.nodeId2 }
    this.edges.push(d3Edge)
    this.nodeTable[d3Edge.source].connectionCount++
    this.nodeTable[d3Edge.target].connectionCount++
    updateNodeAttr(this.nodeTable[d3Edge.source])
    updateNodeAttr(this.nodeTable[d3Edge.target])

    this.viewportSVG.append("g")
      .attr("stroke", "#00f")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(this.edges)
    .join("line")
      .attr("stroke-width",10)
    .merge(this.edgeSVG)

    this.simulation.nodes(this.nodes)
    this.simulation.restart()
  }

  public removeAll() {
    this.nodes = []
    this.edges = []
    this.nodeTable = {}
    this.nodeSVG.remove()
    this.edgeSVG.remove()
    this.nodeTextSVG.remove()
    this.simulation.nodes(this.nodes)
    this.simulation.restart()
  }

  public getSVG() {
    const el = this.svg.node()
    if (el) {
      el.style.width = '100vw';
      el.style.height = '100vh';
    }
    return el
  }

  public getSelectedNode() {
    return this.previousSelectedNodeId
  }

  public dispose() {
    this.svg.remove()
    this.simulation.stop()

    window.removeEventListener("resize", this.onResize)
    window.removeEventListener("keydown", this.onKeyDown)
    window.removeEventListener("keyup", this.onKeyUp)
  }

  private tick() {
    this.edgeSVG
      .attr("x1", (d) => (d.source as D3Node).x as number)
      .attr("y1", (d) => (d.source as D3Node).y as number)
      .attr("x2", (d) => (d.target as D3Node).x as number)
      .attr("y2", (d) => (d.target as D3Node).y as number);
    this.nodeSVG
      .attr("cx", (d) => d.x as number)
      .attr("cy", (d) => d.y as number)
    this.nodeTextSVG
      .attr("x", (d) => d.x as number)
      .attr("y", (d) => d.y as number);
  }

  // イベントハンドラ
  private onZoom (e: any) {
    this.viewportSVG.attr("transform", e.transform)
  }

  private onDragStart(event: any, d: D3Node) {
    console.log("drag start")
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  private onDragged(event: any, d: D3Node) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  private onDragEnd(event: any, d: D3Node) {
    if (!event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  private onClickHandler (e: any, d: D3Node) {
    e.preventDefault()
    if (this.shiftKeyIsPressed && this.onShiftClick) {
      this.onShiftClick(this, d.id)
      return
    }

    if (this.previousSelectedNodeId === d.id) {
      this.previousSelectedNodeId = undefined
      d.isSelected = false
    } else {
      if (this.previousSelectedNodeId) this.nodeTable[this.previousSelectedNodeId].isSelected = false
      d.isSelected = true
      this.previousSelectedNodeId = d.id
    }
    
    // 選択を画面に反映
    this.nodeSVG.attr("stroke-width", d => d.isSelected ? 3 : 1)
  }

  private onKeyDown(e: any) {
    if (e.key !== "Shift") return
    this.shiftKeyIsPressed = true
  }

  private onKeyUp(e: any) {
    if (e.key !== "Shift") return
    this.shiftKeyIsPressed = false
  }

  private onResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.svg.attr("width", this.width).attr("height", this.height)
    this.simulation.force("center", d3.forceCenter(this.width / 2, this.height / 2))
  }
}
