
import { useCallback ,useState } from 'react'
import { useOnEvent } from '../lib/hooks/stream.ts'
import { useNavigate } from "react-router-dom"
import { useSetTheme } from "../lib/hooks/theme"
import { useSetUsers } from "../lib/hooks/users"
import UserListWating from '../components/userlistWaiting.tsx'


const Waiting = () => {
  const [users,setUser] = useState<string[]>([]);
  const [themeText, setThemeText] = useState("");
  const setTheme = useSetTheme()
  const setUsers = useSetUsers();
  const navigate = useNavigate();
  


  useOnEvent(useCallback((event) => {
    if (event.event.case == 'joined'){
      setUser(event.event.value.currentUsers.map(item => (item.name)))
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
    setTheme(themeText)
    setUsers(users)
    navigate("/game"
    //,{
    //  state:{users:{users}},
    //}
    );
  }

  return (
    <div>
      <div>
        <h1>Waiting</h1>
        <button onClick={testSetTheme}></button>
        <p>This is the waiting page {}</p>
        <UserListWating users = {users}></UserListWating>

        <input
          value={themeText}  // 入力を格納する変数
          onChange={(event) => {
            setThemeText(event.target.value)
          }
        }
        />
      </div>
    </div>   
  )
}

export default Waiting
  
