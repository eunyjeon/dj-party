import React from 'react'
import styled from 'styled-components'
import { Rooms } from './'
import NewRoomModal from './createNewRoom/newRoomModal'

//Right now, redux is not set up to check if a user is logged in.  This because we are going to use Apollo to query for user information.  As of now, once you log into Spotify, you'll be redirected to this page.

const WelcomeDiv = styled.div`
  margin-top: 0px;
  padding-top: 10px;
  background-image: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.cherry},
    ${({ theme }) => theme.golden}
  );
  font-family: 'Montserrat', sans-serif;
`
const Heading = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.golden};
  font-weight: 800;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  font-size: 1.5rem;
`

/**
 * COMPONENT
 */

export const UserHome = (props) => {
  return (
    <WelcomeDiv>
      <Heading>
        <h1>Welcome to the party!</h1>
      </Heading>

      <NewRoomModal />

      <Rooms />
    </WelcomeDiv>
  )
}

export default UserHome
