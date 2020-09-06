import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import UserSearchBar from './userSearchBar'

const UserListDiv = styled.div`
  margin: 20px;
  list-style-type: none;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 8px 8px 10px black;
  background-image: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.sky},
    ${({ theme }) => theme.mint}
  );
  width: 20vw;
`

function UsersList(props) {
  return (
    <UserListDiv>
      <UserSearchBar />
      <h1>User List</h1>
      <ul>
        {props.users.map((user) => (
          <li>{user.spotifyUsername} </li>
        ))}
      </ul>
    </UserListDiv>
  )
}

export default withRouter(UsersList)
