<<<<<<< HEAD
import UserList from "../components/userlist"
import {User} from '../components/user'
=======
import { ThemeDisplay } from "../components/common/ThemeDisplay"
>>>>>>> main

const Game = () => {
  const users: User[] = [
    {
      user: 'A'
    },
    {
      user: 'B'
    }
  ];
    return (
      <div>
        <ThemeDisplay />
        <h1>Game</h1>
        <p>This is the game page</p>
        <UserList users={users}/>
      </div>
    )
  }
  
  export default Game
  