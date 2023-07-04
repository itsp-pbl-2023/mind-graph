import { useUsers } from '../lib/hooks/users';
import { getUserID } from '../lib/state/user';
import { ListStyle, IsMe, NotMe } from './userlistDesign';

const UserList = () => {
  const users = useUsers()
  const userID = getUserID()

  return (
    <div>
        <ul>
          {users.map( item =>
            item.id == userID ?
            <ListStyle key={item.id}>
              <IsMe>{item.name}</IsMe>
            </ListStyle>:
            <ListStyle key={item.id}>
            <NotMe>{item.name}</NotMe>
          </ListStyle>
          )}
        </ul>
      </div>
  );
};

export default UserList;