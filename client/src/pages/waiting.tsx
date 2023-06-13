import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSetTheme } from "../lib/hooks/theme"
import {useState} from "react"

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
        <form>
          <div>
            <label>Enter theme:</label>
            <input type="text" value={theme} onChange={(e) => setInputTheme(e.target.value)}/>
            <button onClick={testSetTheme}></button>
          </div>
        </form>
        
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
  