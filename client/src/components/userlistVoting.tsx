import { useUsers } from '../lib/hooks/users';
import { getUserID } from '../lib/state/user';
import { useVoted } from '../lib/hooks/voted';
import { ListStyle, IsMe, NotMe, FlexStyle, CheckboxDesign } from './userlistDesign';



const UserList = () => {
  const users = useUsers()
  const userID = getUserID()
  const voted = useVoted()

  return (
    <div>
        <ul>
          {users.map( item =>
            item.id === userID?
              <ListStyle key={item.id}><FlexStyle>
                <IsMe>{item.name} </IsMe>
                <CheckboxDesign type="checkbox" id={item.id} checked={voted.includes(item.id)} readOnly/>
                </FlexStyle></ListStyle>:
              <ListStyle key={item.id}><FlexStyle>
                <NotMe>{item.name} </NotMe>
                <CheckboxDesign type="checkbox" id={item.id} checked={voted.includes(item.id)} readOnly/>
                </FlexStyle></ListStyle>  
          )}
        </ul>
      </div>
  );
};

export default UserList;