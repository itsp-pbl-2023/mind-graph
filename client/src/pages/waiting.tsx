import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSetTheme } from "../lib/hooks/theme"
import { useOnEvent } from "../lib/hooks/stream"
import { client } from "../lib/client"
import { useName } from "../lib/hooks/name"
import Button from "../components/button"

const Waiting = () => {
  const name = useName();
  const setTheme = useSetTheme();
  const navigate = useNavigate();
  
  const [themeText, setThemeText] = useState("");
  const testSetTheme = () => {
    client.setTheme({
      theme: themeText, 
      senderId: name, 
    })
  }

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
      </div>
      <div>
        <input
          value={themeText}  // 入力を格納する変数
          onChange={(event) => setThemeText(event.target.value)}
          />
      </div>
      <div>
        {/* <button onClick={testSetTheme}>send</button> */}
        <Button text="Send" onClick={testSetTheme}/>
      </div>
    </div>
  )
}

export default Waiting
  