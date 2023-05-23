import { useContext } from 'react'
import { NameContext } from './name.tsx'

export const useName = () => {
  const { name } = useContext(NameContext)
  return name
}

export const useSetName = () => {
  const { setName } = useContext(NameContext)
  return setName
}
