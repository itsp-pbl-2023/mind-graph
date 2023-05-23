import React, {useState, useEffect} from 'react';
import axios from 'axios';


const UserList = () => {

  const user_list = [{name:'Aさん'}, {name:'Bさん'}, {name:'Cさん'}];
  return (
    <div>
        <ul>
          <h3>参加者 {user_list.length}人</h3>
          {user_list.map( user =>
            <li>{user.name}</li>
          )}
        </ul>
      </div>
  );
};

export default UserList;