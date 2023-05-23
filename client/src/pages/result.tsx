import Button from "../components/button"
import { useNavigate } from "react-router-dom"

const Result = () => {
  const navigate = useNavigate();  
  const returnToTitle = () => {
    navigate("/Title")
  }
    return (
      <div>
        <h1>Result</h1>
        <p>This is the result page</p>
        <Button text="タイトルに戻る" onClick={returnToTitle} />
      </div>
    )
  }
  
  export default Result
  