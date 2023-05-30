import { useCallback, useEffect, useState } from 'react'
import UserList from "../components/userlist"
import { useSetName, useName } from '../lib/hooks/name.ts'
import { useOnEvent } from '../lib/hooks/stream.ts'
import { User } from '../components/user.tsx'

const Waiting = () => {
  const name = useName()
  const setName = useSetName()
  const [users, setUsers] = useState<User[]>([{user:'A'},{user:'B'}]);
  function addUser(user:User) {
    setUsers([...users, user]);
  }

  // ユーザーの入力を模倣
  useEffect(() => {
    setTimeout(() => setName('Fogrex'), 1000)
  }, [setName,name])

  useOnEvent(useCallback((event) => {
    console.log(`new event ${event.event.case}`)
    console.log(event)
    addUser({user:name})
  }, [name]))
    return (
      <div>
        <h1>Wagotiting</h1>
        <p>This is the waiting page</p>
        <UserList users={users} ></UserList>
      </div>

    )
  }
  
  export default Waiting
  