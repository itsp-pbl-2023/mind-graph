
import { useUsers } from '../lib/hooks/users';
import { useName } from '../lib/hooks/name';
import styled from "styled-components"
import { FC } from 'react';


const UserListStyle  = styled.div`
  //width: {};
  padding:3em;
  background-color: #FFFFFF;
  border: 6px solid;
  border-color: #30A6FF;
  border-radius: 45px;
`
const UserListTitleStyle = styled.h1`
  font-size: 32px;
  font-family: 'Noto Sans JP';
`
const ListStyle = styled.li`
  //font-size: 32px;
  font-family: 'Noto Sans JP';
  //list-style-position:inside;
`

const ListStyleMe = styled.li`
  list-style:none;
  //font-size: 16px;
  margin: 15px;
  padding: 2px 32px 2px; 
  font-family: 'Noto Sans JP';
  width: 100px;
  align-items: center;
  border: 5px solid;
  border-color: #B2D8F5;
  background-color: #B2D8F5;
`;

const ListStylenotMe = styled.li`
  list-style:none;
  //font-size: 16px;
  margin: 15px;
  padding: 2px 32px 2px; 
  font-family: 'Noto Sans JP';
  width: 100px;
  align-items: center;
  background-color: #B2D8F5;
  border: 5px solid;
  border-color: #B2D8F5;
  background-color: #FFFFFF;
  border: 5px solid;
  border-color: #B2D8F5;
`

type PageProps ={
  isWaiting: boolean;
}

const UserList: FC<PageProps> = (pageProps) => {
  const isWaiting = pageProps.isWaiting
  const users = useUsers()
  const name = useName()

  if (isWaiting){
    return (
      <UserListStyle>
        <UserListTitleStyle>参加者一覧 {users.length}人</UserListTitleStyle>
          <ul>
            {users.map( item =>
              <ListStyle key={item.id}>{item.name}</ListStyle>
            )}
          </ul>
        </UserListStyle>
    );
  }else{
    return (
      <div>
          <ul>
            {users.map( item =>
              item.name == name ?
                <ListStyleMe key={item.id}>{item.name}</ListStyleMe>:
                <ListStylenotMe key={item.id}>{item.name}</ListStylenotMe>
            )}
          </ul>
        </div>
    );
  }


};

export default UserList;