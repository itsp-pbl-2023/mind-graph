
import { useUsers } from '../lib/hooks/users'; 



const UserList = () => {
  const users = useUsers()

  if (users === undefined ){
    return (
      <div>
        <ul>
          <h3>参加者 undefined</h3>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
          <ul>
            <h3>参加者 {users.length}人</h3>
            {users.map( item =>
              <li>{item}</li>
            )}
          </ul>
        </div>
    );
  }

};

export default UserList;