import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import UserSearchBar from './userSearchBar'

const UserListDiv = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 8px 8px 10px black;
  background-image: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.sky},
    ${({ theme }) => theme.mint}
  );
  width: 20vw;
  overflow: scroll;
  max-height: 20vw;
`

function UsersList(props) {
  return (
    <UserListDiv>
      {/*       <UserSearchBar /> */}
      <h3>Listeners</h3>
      {props.users.map((user) => (
        <p>{user.spotifyUsername} </p>
      ))}
    </UserListDiv>
  )
}

export default withRouter(UsersList)
