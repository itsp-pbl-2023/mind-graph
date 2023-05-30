import { FC } from 'react';
import {User} from './user'

type userProps = {
  users: User[];
}

const UserList: FC<userProps> = (userProps) => {
  const {users} = userProps;
  return (
    <div>
        <ul>
          <h3>参加者 {users.length}人</h3>
          {users.map( item =>
            <li>{item.user}</li>
          )}
        </ul>
      </div>
  );
};

export default UserList;