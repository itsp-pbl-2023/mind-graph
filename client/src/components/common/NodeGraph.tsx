// gRPC互換の型

import { useEffect, useRef, useState } from "react"
import { GraphBuilder } from "../../lib/graph/graphBuilder"

// TODO: gRPC実装後に消す
export interface Node {
  id: string
  word: string
  creatorId: string
}

export interface Edge {
  nodeId1: string
  nodeId2: string
}

interface NodeGraphProps {
  nodes: Node[]
  edges: Edge[]
}

export const NodeGraph = ({nodes, edges}: NodeGraphProps) => {
  const d3WrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const {
      svg,
      dispose
    } = GraphBuilder(nodes, edges, 1000, 600)

    const svgNode = svg.node()
    if (svgNode) {
      d3WrapperRef.current?.appendChild(svgNode)
      return () => {
        dispose()
        d3WrapperRef.current?.removeChild(svgNode)
      }
    }
  
  }, [nodes, edges])

  return <>
    <div ref={d3WrapperRef}>
    </div>
  </>
}