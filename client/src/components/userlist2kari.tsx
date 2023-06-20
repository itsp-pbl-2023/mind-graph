
import { useUsers } from '../lib/hooks/users';
import { useName } from '../lib/hooks/name';
import styled from "styled-components"



const ListStyle  = styled.li`
  ${props => getTagColor(props)}
`

const getTagColor = props => {
  if(props.me){
    return `
      background-color: #B2D8F5;
      border-color: #B2D8F5;
      
    `
  }
  if(props.notme){
    return `
      background-color: #FFFFFF;
      border-color: #B2D8F5;
      
    `
  }
}



const UserList2 = () => {
  const users = useUsers()
  const name = useName()

  return (
    <div>
        <ul>
          <h3>参加者 {users.length}人</h3>
          {users.map( item =>
            item.name == name ?
              <ListStyle me key={item.id}>{item.name}</ListStyle>:
              <ListStyle notme key={item.id}>{item.name}</ListStyle>
          )}
        </ul>
      </div>
  );

};

export default UserList2;