import { ReactNode, createContext, useMemo, useState } from 'react'
import { User } from '../../components/user'

type UsersContextType = {
  users?: User[]
  setUsers: (users: User[]) => void
}

export const UsersContext = createContext<UsersContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUsers: () => {} // no op
})

export interface UsersProviderProps {
  children: ReactNode
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<User[]>()
  const value = useMemo(() => {
    return { users, setUsers }
  }, [users, setUsers])
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  )
}
