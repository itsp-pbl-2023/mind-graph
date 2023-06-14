
import { useUsers } from '../lib/hooks/users';

const UserList = () => {
  const users = useUsers()


  return (
    <div>
        <ul>
          <h3>参加者 {users.length}人</h3>
          {users.map( item =>
            <li key={item.id}>{item.name}</li>
          )}
        </ul>
      </div>
  );

};

export default UserList;