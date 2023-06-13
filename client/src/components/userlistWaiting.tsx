import { FC } from 'react';

type userProps = {
  users: string[];
}

const UserListWating: FC<userProps> = (userProps) => {
  const {users} = userProps;
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
};

export default UserListWating;
