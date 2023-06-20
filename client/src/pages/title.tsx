import { useNavigate } from "react-router-dom"
import logo from "../assets/mindgraphLogo.jpg"
import {ChangeEvent, useState} from "react"
import Button from "../components/button"
import { useSetName } from "../lib/hooks/name"
import "./title.css"
import styled from "styled-components"

const TitleText = styled.p`
    font-family: "Patrick Hand SC";
    font-size: 64px;
    line-height: 1px;
    text-shadow: 1px 4px 4px #00000040;
  `
const SubTitleText = styled.p`
    font-size: 32px;
    font-family: "Patrick Hand SC";
    line-height: 1px;
`

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
        <TitleText>Mind Graph</TitleText>
        <SubTitleText>Minna no Nou wo Kashikasuru</SubTitleText>

        <img src={logo} alt="Mind graph logo" />

        <p>名前を入力</p>
        <form>
          <div>
            <label htmlFor="name">名前</label>
            <input type="text" onChange={handleChange} value = {userName}/>
          </div>
          <Button text="送信" onClick={navigateToWaiting}/>
        </form>
      </div> 
    )

    
  }
  
  export default Title
  