import UserList from "../components/userlist"
import { ThemeDisplay } from "../components/common/ThemeDisplay"
import ExplainText from "../components/explainText"


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
        <ExplainText
          outline='何かしら今やってほしいことの説明' 
          elements={[
            'イイネ！と思ったノードを選び、投票ボタンを押す', 
          ]}
        />
      </div>
    )
  }
  

  

  export default Voting
  
