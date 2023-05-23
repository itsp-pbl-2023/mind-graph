import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type NameContextType = {
  name?: string
  setName: (name: string) => void
}
const NameContext = createContext<NameContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setName: () => {} // no op
})

export interface NameProviderProps {
  children: ReactNode
}
export const NameProvider = ({ children }: NameProviderProps) => {
  const [name, setName] = useState<string>()
  const value = useMemo(() => {
    return { name, setName }
  }, [name, setName])
  return (
    <NameContext.Provider value={value}>{children}</NameContext.Provider>
  )
}

export const useName = () => {
  const { name } = useContext(NameContext)
  return name
}

export const useSetName = () => {
  const { setName } = useContext(NameContext)
  return setName
}
