import { useContext } from "react"
import { UsersContext } from "./users.tsx"
import { User } from '../../components/user'

export const useUsers = ():User[] => {
  const { users } = useContext(UsersContext)
  if (users == undefined){
    return []
  }
  else{
    return users
  }
}

export const useSetUsers = () => {
  const { setUsers } = useContext(UsersContext)
  return setUsers
}
