import Timer from "../components/timer"
import UserList from "../components/userlist"
import { ThemeDisplay } from '../components/common/ThemeDisplay'
import { useOnEvent } from '../lib/hooks/stream.ts'
import { useCallback, useState } from 'react'
import Button from '../components/button.tsx'
import { client } from '../lib/client.ts'
import { useName } from '../lib/hooks/name.ts'

const Game = () => {
  // ダミー変数
  // 読み込んでから60秒
  const [expireDummy] = useState(new Date(new Date().getTime() + 10*1000))

  const name = useName()
  const [text, setText] = useState('')

  const send = () => {
    if (text === '') return
    client.createNode({ word: text, creatorId: name })
    setText('')
  }

  useOnEvent(useCallback((event) => {
    console.log(`new event ${event.event.case}`)
    console.log(event)
  }, []))

  return (
    <div>
      <ThemeDisplay />
      <h1>Game</h1>
      <p>This is the game page</p>
      <UserList />
      <Timer expire={expireDummy}></Timer>
      <div>
        <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
        <Button text='送信' onClick={() => send()}/>
      </div>
    </div>
  )
}

export default Game
  