import { useContext } from 'react'
import { GraphContext } from './graph.tsx'

export const useGraph = () => useContext(GraphContext)
