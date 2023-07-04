import { useCallback, useState } from "react"
import { useOnEvent } from "../lib/hooks/stream"
import { useNavigate } from "react-router-dom"
import { useSetTheme } from "../lib/hooks/theme"
import { useSetUsers } from "../lib/hooks/users"
import { client } from "../lib/client"
import UserList from '../components/userlistWaiting.tsx'
import Button from "../components/button"
import InputForm from '../components/input.tsx'
import { getUserID } from '../lib/state/user.ts'
import styled, { createGlobalStyle } from 'styled-components'

const Background = createGlobalStyle`
  body {
    width: 100vw;
    height: 100vh;
    background: var(--background-color);
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  min-height: 600px;
  width: 500px;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const Waiting = () => {
  const [themeText, setThemeText] = useState("");
  const setTheme = useSetTheme();
  const setUsers = useSetUsers();
  const navigate = useNavigate();
  const SendTheme = () => {
    client.setTheme({
      theme: themeText,
      senderId: getUserID(),
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
  }, [setTheme, navigate]))

  return (
    <Container>
      <Background />
      <UserList />
      <ButtonsContainer>
        <InputForm
          value={themeText}  // 入力を格納する変数
          onChange={(event) => setThemeText(event.target.value)}
          placeholder='主題の入力'
        />
        <Button text="ゲームを開始する" onClick={SendTheme}></Button>
      </ButtonsContainer>
    </Container>
  )
}

export default Waiting
