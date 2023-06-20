import { Node } from "../api/api_pb"

// connection
export interface NodeWithD3Attr {
  connectionCount: number
  fontSize: number
  radius: number
  wrappedText: string
  isSelected: boolean
}
export const NODE_WIDTH_D3ATTR_DEFAULT = {
  connectionCount: 0,
  fontSize: 0,
  radius: 0,
  wrappedText: '',
  isSelected: false,
}

export type D3Node = d3.SimulationNodeDatum & Node & NodeWithD3Attr
export type D3Edge = d3.SimulationLinkDatum<D3Node>