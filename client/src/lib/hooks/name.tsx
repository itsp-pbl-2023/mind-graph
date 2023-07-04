import { createContext, ReactNode, useMemo, useState } from 'react'

type NameContextType = {
  name?: string
  setName: (name: string | undefined) => void
}
export const NameContext = createContext<NameContextType>({
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
