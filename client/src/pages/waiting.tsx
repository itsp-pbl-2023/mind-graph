import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSetTheme } from "../lib/hooks/theme"

const Waiting = () => {
  const setTheme = useSetTheme()
  const navigate = useNavigate();
  
  const [themeText, setThemeText] = useState("");
  const testSetTheme = () => {
    setTheme(themeText)
    navigate("/game")
  }

  return (
    <div>
      <div>
        <h1>Waiting</h1>
        <button onClick={testSetTheme}></button>
        <p>This is the waiting page</p>
      </div>

      <div>
        <input
          value={themeText}  // 入力を格納する変数
          onChange={(event) => setThemeText(event.target.value)}
        />
      </div>
    </div>   
  )
}

export default Waiting
  