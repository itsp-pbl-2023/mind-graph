
const UserList = () => {

  const user_list: string[] = ['Aさん', 'Bさん', 'Cさん'];
  return (
    <div>
      <h1>参加者リスト {user_list.length}人</h1>
        <ul>
          {user_list.map( user =>
            <li>{user}</li>
          )}
        </ul>
      </div>
  );
};

export default UserList;