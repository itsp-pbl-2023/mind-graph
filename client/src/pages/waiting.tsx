import { useCallback, useEffect, useState } from 'react'
import UserList from "../components/userlist"
import { useOnEvent } from '../lib/hooks/stream.ts'
import {User} from '../components/user'

const Waiting = () => {
  const users:User[] = [];


  useOnEvent(useCallback((event) => {
    console.log(`new event ${event.event.case}`)
    console.log(event)
    if (event.event.case == 'joined'){
      event.event.value.currentUsers.map(item =>
        users.push({user:item.name})
      )
      
    }
  }, []))
    return (
      <div>
        <h1>Waiting</h1>
        <p>This is the waiting page</p>
        <UserList users={users} ></UserList>

        
      </div>

    )
  }
  
  export default Waiting
  