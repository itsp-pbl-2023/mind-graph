import { useState } from "react"
import { ThemeDisplay } from "../components/common/ThemeDisplay"


const Voting = () => {
  const [active, setActive] = useState(false);
  const onClickHandler = () => {
    setActive(current => !current);
  }

    return (
      <div>
        <h1>Voting</h1>
        <ThemeDisplay />
        <p>This is the voting page</p>
        <button onClick={onClickHandler}
        style = {{backgroundColor: active? 'green':'white'}}></button>
      </div>
      
    )
  }
  
  export default Voting
  
