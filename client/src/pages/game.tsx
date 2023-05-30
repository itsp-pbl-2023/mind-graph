import UserList from "../components/userlist"

const Game = () => {
    return (
      <div>
        <h1>Game</h1>
        <p>This is the game page</p>
        <UserList users={['A','B']}/>
      </div>
    )
  }
  
  export default Game
  