import { useNavigate } from "react-router-dom"
import logo from "../assets/mindgraphLogo.jpg"

const Title = () => {
  //TODO コンポーネントを置き換える

    const navigate = useNavigate();

    const navigateToWaiting = () => {
      navigate('/waiting');
    }

    return (
      <div>
        <h1>MIND GRAPH</h1>
        <p>MINNA NO NOU WO KASHIKASURU</p>

        <img src={logo} className="logo mind graph" alt="Mind graph logo" />

        <form>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <button type="submit" className="submit-btn" onClick={navigateToWaiting}>
            Submit
          </button>
        </form>
      </div>

      
    )
  }
  
  export default Title
  