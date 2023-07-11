import { ReactNode, createContext, useMemo, useState } from 'react'

type VotedContextType = {
  voted?: string[]
  setVoted: (voted: string[]) => void
}

export const VotedContext = createContext<VotedContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setVoted: () => {} // no op
})

export interface VotedProviderProps {
  children: ReactNode
}

export const VotedProvider = ({ children }: VotedProviderProps) => {
  const [voted, setVoted] = useState<string[]>()
  const value = useMemo(() => {
    return { voted, setVoted }
  }, [voted, setVoted])
  return (
    <VotedContext.Provider value={value}>{children}</VotedContext.Provider>
  )
}
