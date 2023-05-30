import UserList from "../components/userlist"
import { User } from '../components/user.tsx'



const Voting = () => {
  const users: User[] = [
    {
      user: 'A'
    },
    {
      user: 'B'
    }
  ];
  /*
  const users:Users = location.state as {User[]}
  */

    return (
      <div>
        <h1>Voting</h1>
        <p>This is the voting page</p>
        <UserList users={users} ></UserList>
      </div>
    )
  }
  

  

  export default Voting
  
