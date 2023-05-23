import React, { FC } from 'react';
import {user} from './user';

type userProps = {
  users: user[];
}

const UserList: FC<userProps> = (userProps) => {
  const {users} = userProps;
  return (
    <div>
        <ul>
          <h3>参加者 {users.length}人</h3>
          {users.map( use =>
            <li>{use.name}</li>
          )}
        </ul>
      </div>
  );
};

export default UserList;