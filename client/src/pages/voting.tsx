<<<<<<< HEAD
import UserList from "../components/userlist"
import { User } from '../components/user.tsx'


=======
import { ThemeDisplay } from "../components/common/ThemeDisplay"
>>>>>>> main

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
        <ThemeDisplay />
        <p>This is the voting page</p>
        <UserList users={users} ></UserList>
      </div>
    )
  }
  

  

  export default Voting
  
