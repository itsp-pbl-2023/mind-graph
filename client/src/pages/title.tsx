import { useNavigate } from "react-router-dom"
import logo from "../assets/mindgraphLogo.jpg"
import {ChangeEvent, useState} from "react"
import Button from "../components/button"
import { useSetName } from "../lib/hooks/name"

const Title = () => {

  const [userName, setUserName] = useState("");

  const setName = useSetName();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }
  
  const navigate = useNavigate();
  const navigateToWaiting = () => {
    setName(userName);
    navigate('/waiting');
  }

  //TODO コンポーネントを置き換える
    return (
      <div>
        <h1>MIND GRAPH</h1>
        <p>MINNA NO NOU WO KASHIKASURU</p>

        <img src={logo} alt="Mind graph logo" />

        <form>
          <div>
            <input type="text" 
            placeholder="名前の入力" 
            onChange={handleChange} 
            value = {userName} 
            style={{backgroundColor: "white", borderRadius: "25px", height: "30px", width: "400px", color: "black", textAlign: "center"}}/>
          </div>
          <Button text="送信" onClick={navigateToWaiting}></Button>
        </form>
      </div> 
    )

    
  }
  
  export default Title
  