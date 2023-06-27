import { useUsers } from '../lib/hooks/users';
import styled from "styled-components"

const UserListStyle  = styled.div`
  padding:3em;
  background-color: var(--background-color);
  border: 6px solid;
  border-color: #30A6FF;
  border-radius: 45px;
  margin: 2em 10em 2em;
`
const UserListTitleStyle = styled.h1`
  font-size: 32px;
  font-family: 'Noto Sans JP';
`
const ListStyle = styled.li`
  font-family: 'Noto Sans JP';
`

const UserList= () => {
  const users = useUsers()

  return (
    <UserListStyle>
      <UserListTitleStyle>参加者一覧 {users.length}人</UserListTitleStyle>
        <ul>
          {users.map( item =>
            <ListStyle key={item.id}>{item.name}</ListStyle>
          )}
        </ul>
    </UserListStyle>
  )
};

export default UserList;