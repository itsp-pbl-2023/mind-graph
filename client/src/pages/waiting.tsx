import UserList from "../components/userlist"

const Waiting = () => {
  const timer = 100 //リロードする時間
  window.addEventListener('load',function(){
    setInterval('location.reload()',timer)
  });
    return (
      <div>
        <h1>Wagotiting</h1>
        <p>This is the waiting page</p>
        <UserList />
      </div>

    )
  }
  
  export default Waiting
  