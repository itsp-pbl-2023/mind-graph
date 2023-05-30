import Button from "../components/button"
import { useNavigate } from "react-router-dom"
import { ThemeDisplay } from "../components/common/ThemeDisplay";

const Result = () => {
  const navigate = useNavigate();  
  const returnToTitle = () => {
    navigate("/Title")
  }
    return (
      <div>
        <h1>Result</h1>
        <ThemeDisplay />
        <p>This is the result page</p>
        <Button text="タイトルに戻る" onClick={returnToTitle} />
      </div>
    )
  }
  
  export default Result
  