import React from 'react';
import axios, { AxiosResponse } from 'axios';

export interface ForgeUser {
  id: number,
  name: string
}

function ForgeUsers() {

  const [users, setUsers] = React.useState<ForgeUser[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError]  = React.useState(null)

  const getUsers = () => {
    axios
      .get<ForgeUser[]>("/api/v1/users")
      .then(response => response.data.map((user: ForgeUser) => ({
        id: user.id,
        name: `${user.name}`,
      })))      
      .then((users: ForgeUser[]) => {
        setUsers(users)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false);
      })  
  }

  React.useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
      <h2>Forge Users</h2>
      {error && 
        <div>There was an error: {error}</div>
      } 
      <div>
        {!loading ? (
            users.map(user => {
              const { name } = user;
              return (
                <div>
                  <p>{name}</p>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
      </div>
    </>
  );
}

export default ForgeUsers;
