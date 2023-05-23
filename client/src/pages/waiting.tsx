import { useLocation } from "react-router-dom"

const Waiting = () => {
    const location = useLocation();


    return (
      <div>
        <h1>Waiting</h1>
        <p>Hello {location.state.id}</p>
        <p>This is the waiting page</p>
      </div>
    )
  }
  
  export default Waiting
  