import { useCallback, useState } from 'react'
import { useOnEvent } from '../lib/hooks/stream.ts'
import { useNavigate } from "react-router-dom"
import { useSetTheme } from "../lib/hooks/theme"
import { useSetUsers } from "../lib/hooks/users"
import UserList from '../components/userlist.tsx'
import Button from '../components/button.tsx'
import InputForm from '../components/input.tsx'

const Waiting = () => {
  const [themeText, setThemeText] = useState("");
  const setTheme = useSetTheme();
  const setUsers = useSetUsers();
  const navigate = useNavigate();
  
  const testSetTheme = () => {
    setTheme(themeText)
    navigate("/game")
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

  return (
    <div>
      <div>
        <h1>Waiting</h1>
        <Button text="ゲームを開始する" onClick={testSetTheme}></Button>
        <p>This is the waiting page {}</p>
        <UserList />

        <InputForm
          value={themeText}  // 入力を格納する変数
          onChange={(event) => setThemeText(event.target.value)}
          placeholder='主題の入力'
        />
      </div>
    </div>   
  )
}

export default Waiting
