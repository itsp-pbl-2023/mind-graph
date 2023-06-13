import { useContext } from "react"
import { UsersContext } from "./users.tsx"

export const useUsers = () => {
  const { users } = useContext(UsersContext)
  return users
}

export const useSetUsers = () => {
  const { setUsers } = useContext(UsersContext)
  return setUsers
}
