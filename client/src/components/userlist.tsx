
import { useUsers } from '../lib/hooks/users';
import styled from "styled-components"



const UserListStyle  = styled.section`
  width: {};
  padding:3em;
  background-color: #FFFFFF;
  border: 5px solid;
  border-color: #30A6FF;
  border-radius: 25px;
`

const UserList = () => {
  const users = useUsers()


  return (
    <UserListStyle>
        <ul>
          <h3>参加者 {users.length}人</h3>
          {users.map( item =>
            <li key={item.id}>{item.name}</li>
          )}
        </ul>
      </UserListStyle>
  );

};

export default UserList;