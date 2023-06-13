import { useContext } from "react"
import { UsersContext } from "./users.tsx"

export const useUsers = () : string[] => {
  const { users } = useContext(UsersContext)
  if (users == undefined) {
    return ['A']
  }else{
    return users
  }
}

export const useSetUsers = () => {
  const { setUsers } = useContext(UsersContext)
  return setUsers
}
