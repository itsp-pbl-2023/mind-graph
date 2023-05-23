import Timer from "../components/timer"


const Game = () => {
    // ダミー変数
    // 読み込んでから60秒
    const expire_dummy = new Date(new Date().getTime() + 60*1000)
    return (
      <div>
        <h1>Game</h1>
        <p>This is the game page</p>
        <Timer expire={ expire_dummy }></Timer>
      </div>
    )
  }
  
  export default Game
  