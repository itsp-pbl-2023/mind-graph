import { useEffect, useRef } from "react"
import { GraphBuilder } from "../../lib/graph/graphBuilder"
import { Node, Edge } from "../../lib/api/api_pb"
import styled from "styled-components"

interface NodeGraphProps {
  nodes: Node[]
  edges: Edge[]
  onClick: (id: string) => void
}

export const NodeGraph = ({nodes, edges, onClick}: NodeGraphProps) => {
  const d3WrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const {
      svg,
      dispose
    } = GraphBuilder(nodes, edges, 1000, 600, onClick)

    const svgNode = svg.node()
    const d3Wrapper = d3WrapperRef.current

    
    if (svgNode && d3Wrapper) {
      d3Wrapper.appendChild(svgNode)
      svgNode.style.width = '100vw';
      svgNode.style.height = '100vh';

      return () => {
        dispose()
        d3Wrapper.removeChild(svgNode)
      }
    }
  }, [nodes, edges, onClick])

  const D3Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  `

  return <>
    <D3Wrapper ref={d3WrapperRef}>
    </D3Wrapper>
  </>
}