import { useCallback, useState } from "react"
import { useOnEvent } from "../lib/hooks/stream"
import { useNavigate } from "react-router-dom"
import { useSetTheme } from "../lib/hooks/theme"
import { useSetUsers } from "../lib/hooks/users"
import { client } from "../lib/client"
import { useName } from "../lib/hooks/name"
import UserList from "../components/userlist"
import Button from "../components/button"

const Waiting = () => {
  const [themeText, setThemeText] = useState("");
  const setTheme = useSetTheme();
  const setUsers = useSetUsers();
  const name = useName();
  const navigate = useNavigate();
  
  const testSetTheme = () => {
    client.setTheme({
      theme: themeText, 
      senderId: name, 
    })
  }

  useOnEvent(useCallback((event) => {
    if (event.event.case == 'joined'){
      setUsers(event.event.value.currentUsers.map(item => ({id:item.id,name:item.name})))
    }
    /*
    if (event.event.case == 'left'){
      setUsers(event.event.value.currentUsers.map(item => (item.name)))
    }
    */
  }, [setUsers]))

  useOnEvent(useCallback((event) => {
    if(event.event.case === "themeConfirmed"){
      setTheme(event.event.value.theme)
      navigate("/game")
    }
  }, []))

  return (
    <div>
      <div>
        <h1>Waiting</h1>
        <p>This is the waiting page</p>
        <UserList />
      </div>

      <div>
        <input
          value={themeText}  // 入力を格納する変数
          onChange={(event) => setThemeText(event.target.value)}
        />
      </div>
      <div>
        <Button text="送信" onClick={testSetTheme}/>
      </div>
    </div>
  )
}

export default Waiting
