import UserList from "../components/userlist"
import { ThemeDisplay } from "../components/common/ThemeDisplay"
import { FC } from 'react';

const Game: FC = () => {

    return (
      <div>
        <ThemeDisplay />
        <h1>Game</h1>
        <p>This is the game page</p>
        <UserList />
      </div>
    )
  }
  
  export default Game
  