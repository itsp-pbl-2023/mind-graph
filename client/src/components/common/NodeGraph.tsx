import { useEffect, useRef } from "react"
import { GraphBuilder } from "../../lib/graph/graphBuilder"
import { Node, Edge } from "../../lib/api/api_pb"

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

      // こうしないとdivが毎回更新走ってエラーになる
      d3Wrapper.style.width = '100vw';
      d3Wrapper.style.height = '100vh';
      d3Wrapper.style.position = 'fixed';
      d3Wrapper.style.top = '0';
      d3Wrapper.style.left = '0';
      d3Wrapper.style.zIndex = '-1';

      return () => {
        dispose()
        d3Wrapper.removeChild(svgNode)
      }
    }
  }, [nodes, edges, onClick])

  return <>
    <div ref={d3WrapperRef}>
    </div>
  </>
}