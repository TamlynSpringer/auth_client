import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Users = () => {
  const [ users, setUsers ] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        
      }
    }
  }, [])
  return (
    <article>
      <h2>User list</h2>
      {users?.length
      ? (
        <ul>
          {users.map((user, i) => <li key={i}{user?.email}></li>)}
        </ul>
      ) : <p>No users to display</p>
      
      }
    </article>
  )
}

export default Users