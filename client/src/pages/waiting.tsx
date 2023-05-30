
import { useCallback ,useState} from 'react'
import UserList from "../components/userlist"
import { useOnEvent } from '../lib/hooks/stream.ts'
import {User} from '../components/user'
import { useNavigate } from "react-router-dom"
import { useSetTheme } from "../lib/hooks/theme"

const Waiting = () => {
  const [users,setUser] = useState<User[]>([]);
  const setTheme = useSetTheme()
  const navigate = useNavigate();



  useOnEvent(useCallback((event) => {
    if (event.event.case == 'joined'){
      setUser(event.event.value.currentUsers.map(item => ({user: item.name})))
      // event.event.value.currentUsers.map(item =>
      //   users.push({user:item.name})
      // )
      
    }
    /*
    if (event.event.case == 'left'){
      event.event.value.currentUsers.map(item =>
        users.push({user:item.name})
      )
      
    }
    */
  }, []))

  const testSetTheme = () => {
    setTheme('test theme')
    navigate("/game")
  }

  return (
      <div>
        <h1>Waiting</h1>
        <button onClick={testSetTheme}></button>
        <p>This is the waiting page</p>
        <UserList users={users} ></UserList>

        
      </div>

    )
  }
  
  export default Waiting
