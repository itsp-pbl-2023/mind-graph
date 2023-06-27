
import { useUsers } from '../lib/hooks/users';
import { useName } from '../lib/hooks/name';
import styled from "styled-components"



const ListStyle = styled.li`
  ${(props) => getTagColor(props)}
  list-style:none;
  font-size: 32px;
  margin: 15px;
  padding: 2px 48px 2px; 
  font-family: 'Noto Sans JP';
  width: 100px;
  
`

const getTagColor = (props) => {
  if(props.me){
    return `
      background-color: #B2D8F5;
      border: 5px solid;
      border-color: #B2D8F5;
    `
  }
  if(props.notme){
    return `
      background-color: #FFFFFF;
      border: 5px solid;
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