import { useCallback, useEffect, useState } from 'react'
import UserList from "../components/userlist"
import { useSetName, useName } from '../lib/hooks/name.ts'
import { useOnEvent } from '../lib/hooks/stream.ts'




const Voting = () => {
  const name = useName()
  const setName = useSetName()

  type temp = string|undefined
  const [users, setUsers] = useState<temp[]>(['A','B']);
  function addUser(user:temp) {
    setUsers([...users, user]);
  }

  // ユーザーの入力を模倣
  useEffect(() => {
    setTimeout(() => setName('Fogrex'), 1000)
  }, [setName,name])

  useOnEvent(useCallback((event) => {
    console.log(`new event ${event.event.case}`)
    console.log(event)
    addUser(name)
  }, [name]))

  // ユーザーの入力を模倣
  useEffect(() => {
    setTimeout(() => setName('Fogrex'), 1000)
  }, [setName,name])

  useOnEvent(useCallback((event) => {
    console.log(`new event ${event.event.case}`)
    console.log(event)
    addUser(name)
  }, [name]))
    return (
      <div>
        <h1>Voting</h1>
        <p>This is the voting page {name}</p>
        <UserList users={users} ></UserList>
      </div>
    )
  }
  

  

  export default Voting
  
