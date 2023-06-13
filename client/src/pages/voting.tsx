import UserList from "../components/userlist"
import { ThemeDisplay } from "../components/common/ThemeDisplay"


const Voting = () => {
  /*
  const users:Users = location.state as {User[]}
  */
    return (
      <div>
        <h1>Voting</h1>
        <ThemeDisplay />
        <p>This is the voting page</p>
        <UserList />
      </div>
    )
  }
  

  

  export default Voting
  
