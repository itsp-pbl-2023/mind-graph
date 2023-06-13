import { ReactNode, createContext, useMemo, useState } from 'react'

type UsersContextType = {
  users?: string[]
  setUsers: (users: string[]) => void
}

export const UsersContext = createContext<UsersContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUsers: () => {} // no op
})

export interface UsersProviderProps {
  children: ReactNode
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<string[]>()
  const value = useMemo(() => {
    return { users, setUsers }
  }, [users, setUsers])
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  )
}
