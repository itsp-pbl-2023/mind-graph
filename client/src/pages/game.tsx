import UserList from "../components/userlist"
import {User} from '../components/user'

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
        <h1>Game</h1>
        <p>This is the game page</p>
        <UserList users={users}/>
      </div>
    )
  }
  
  export default Game
  