import { useNavigate } from "react-router-dom"
import Logo from "../assets/Logo.svg"
import {ChangeEvent, useState} from "react"
import Button from "../components/button"
import { useSetName } from "../lib/hooks/name"
import InputForm from "../components/input"

import {styled, createGlobalStyle} from "styled-components"

const Page = styled.div `
  padding: 20px 0px;
  min-width: 100vw;
`

const TitleText = styled.p`
    font-family: "Patrick Hand SC";
    font-size: 64px;
    text-shadow: 1px 4px 4px #00000040;
    margin: 0;
  `
const SubTitleText = styled.p`
    font-size: 32px;
    font-family: "Patrick Hand SC";
`
const Gradiation = createGlobalStyle`
  body {
    background : linear-gradient(180deg, #BAE0FD 0%, #F0F9FF 100%);
  }
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
      <>
      <Gradiation></Gradiation>
      <Page>
        <TitleText>Mind Graph</TitleText>
        <SubTitleText>Minna no Nou wo Kashikasuru.</SubTitleText>

        <img src={Logo}  alt="Mind graph logo" width={300}/>

        <p>名前を入力</p>
        <form>
          <div>
            <InputForm type="text" onChange={handleChange} value = {userName} placeholder="名前の入力"></InputForm>
          </div>
          <Button text="送信" onClick={navigateToWaiting}></Button>
        </form>
      </Page> 
      </>
    )

    
  }
  
  export default Title
  