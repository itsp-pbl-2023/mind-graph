import { useNavigate } from "react-router-dom"
import { useSetTheme } from "../lib/hooks/theme"

const Waiting = () => {
  const setTheme = useSetTheme()
  const navigate = useNavigate();

  const testSetTheme = () => {
    setTheme('test theme')
    navigate("/game")
  }

  return (
      <div>
        <h1>Waiting</h1>
        <button onClick={testSetTheme}></button>
        <p>This is the waiting page</p>
      </div>
    )
  }
  
  export default Waiting
  