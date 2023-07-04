import { useUsers } from '../lib/hooks/users';
import { getUserID } from '../lib/state/user';
import { useVoted } from '../lib/hooks/voted';
import styled from "styled-components"


const ListStyleIsMe = styled.p`
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

const ListStyleNotMe = styled.li`
  list-style:none;
  margin: 15px;
  padding: 2px 32px 2px; 
  font-family: 'Noto Sans JP';
  width: 100px;
  align-items: center;
  border: 5px solid;
  border-color: var(--primary-color);
  background-color: var(--background-color);
`

const UserList = () => {
  const users = useUsers()
  const userID = getUserID()
  const voted = useVoted()

  return (
    <div>
        <ul>
          {users.map( item =>
            item.id === userID?
              <ListStyleIsMe key={item.id}>
                {item.name} 
                <input type="checkbox" id={item.id} checked={voted.includes(item.id)} readOnly/>
              </ListStyleIsMe>:
              <ListStyleNotMe key={item.id}>
                {item.name} 
                <input type="checkbox" id={item.id} checked={voted.includes(item.id)} readOnly/>
              </ListStyleNotMe>
              
          )}
        </ul>
      </div>
  );
};

export default UserList;