
import { useUsers } from '../lib/hooks/users';
import styled from "styled-components"
import { getUserID } from '../lib/state/user.ts'

const ListStyleMe = styled.li`
  list-style:none;
  margin: 15px;
  padding: 2px 32px 2px; 
  font-family: 'Noto Sans JP';
  width: 100px;
  align-items: center;
  border: 5px solid;
  border-color: var(--primary-color);
  background-color: var(--primary-color);
`;

const ListStylenotMe = styled.li`
  list-style:none;
  margin: 15px;
  padding: 2px 32px 2px; 
  font-family: 'Noto Sans JP';
  width: 100px;
  align-items: center;
  border: 5px solid;
  border: 5px solid;
  border-color: var(--primary-color);
  background-color: var(--background-color);
`

const UserList = () => {
  const users = useUsers()
  const userid = getUserID()

  return (
    <div>
        <ul>
          {users.map( item =>
            item.id == userid ?
              <ListStyleMe key={item.id}>{item.name}</ListStyleMe>:
              <ListStylenotMe key={item.id}>{item.name}</ListStylenotMe>
          )}
        </ul>
      </div>
  );


};

export default UserList;