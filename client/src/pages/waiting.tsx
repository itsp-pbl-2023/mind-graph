
import { useCallback ,useState } from 'react'
import { useOnEvent } from '../lib/hooks/stream.ts'
import { useNavigate } from "react-router-dom"
import { useSetTheme } from "../lib/hooks/theme"
import { useSetUsers } from "../lib/hooks/users"
import UserList from '../components/userlist.tsx'


const Waiting = () => {
  const [themeText, setThemeText] = useState("");
  const setTheme = useSetTheme();
  const setUsers = useSetUsers();
  const navigate = useNavigate();
  


  useOnEvent(useCallback((event) => {
    if (event.event.case == 'joined'){
      setUsers(event.event.value.currentUsers.map(item => (item.name)))

    }
    /*
    if (event.event.case == 'left'){
      setUsers(event.event.value.currentUsers.map(item => (item.name)))
    }
    */
  }, [setUsers]))

  
  const testSetTheme = () => {
    setTheme(themeText)
    //setUsers(users)
    navigate("/game");
  }

  return (
    <div>
      <div>
        <h1>Waiting</h1>
        <button onClick={testSetTheme}></button>
        <p>This is the waiting page {}</p>
        <UserList />

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
  
