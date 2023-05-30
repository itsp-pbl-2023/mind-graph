import { useState } from "react"

const Waiting = () => {
  
  const [theme, setTheme] = useState("");

  return (
    <div>
      <div>
        <h1>Waiting</h1>
        <p>This is the Waiting page.</p>
      </div>

      <div>
        <input
          value={theme}  // 入力を格納する変数
          onChange={(event) => setTheme(event.target.value)}
        />
      </div>
    </div>   
  )
}

export default Waiting
  