import { useNavigate } from "react-router-dom"
import logo from "../assets/mindgraphLogo.jpg"
import React, {ChangeEvent, useState} from "react"
import Button from "../components/button"

/*export*/ const [userName, setUserName] = useState("");
//export const nameContext = React.createContext("")



const Title = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }
  
  const navigate = useNavigate();
  const navigateToWaiting = () => {
    navigate('/waiting');
  }

  //TODO コンポーネントを置き換える
    return (
      <div>
        <h1>MIND GRAPH</h1>
        <p>MINNA NO NOU WO KASHIKASURU</p>

        <img src={logo} alt="Mind graph logo" />

        <form>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={handleChange} value = {userName}/>
          </div>
          <Button text="submit" onClick={navigateToWaiting}/>
        </form>
      </div> 
    )
  }
  
  export default Title
  