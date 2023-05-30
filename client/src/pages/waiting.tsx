import { useNavigate } from "react-router-dom"
import { useSetTheme } from "../lib/hooks/theme"
import {useState} from "react"

const Waiting = () => {
  const setTheme = useSetTheme()
  const navigate = useNavigate();
  const [theme, setInputTheme] = useState("");

  const testSetTheme = () => {
    setTheme(theme);
    navigate("/game")
  }

  return (
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
    )
  }
  
  export default Waiting
  