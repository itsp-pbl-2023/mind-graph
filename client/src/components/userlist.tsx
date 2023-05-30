import { FC } from 'react';

type userProps = {
  users: (string|undefined)[];
}

const UserList: FC<userProps> = (userProps) => {
  const {users} = userProps;
  return (
    <div>
        <ul>
          <h3>参加者 {users.length}人</h3>
          {users.map( user =>
            <li>{user}</li>
          )}
        </ul>
      </div>
  );
};

export default UserList;