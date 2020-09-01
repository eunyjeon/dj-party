  
import React from 'react'
import { withRouter } from 'react-router-dom';

function UsersList(props) {

  return (
  <div>
    <h1>User List</h1>
    <ul>
      {props.users.map((user) => (
      <li>{user.spotifyUsername} </li>
      ))}
    </ul>
  </div>
  )
}


export default withRouter(UsersList)