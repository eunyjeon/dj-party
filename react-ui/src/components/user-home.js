import React from 'react'
import styled from 'styled-components'
import { Rooms } from './'
import NewRoomModal from './createNewRoom/newRoomModal'

//Right now, redux is not set up to check if a user is logged in.  This because we are going to use Apollo to query for user information.  As of now, once you log into Spotify, you'll be redirected to this page.

const WelcomeDiv = styled.div`
  background-color: ${({ theme }) => theme.primary};
  font-family: 'Montserrat', sans-serif;
`
const Heading = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.accent};
`

/**
 * COMPONENT
 */

//TODO: username should reflect the current loggedin user
export const UserHome = (props) => {
  return (
    <>
      <WelcomeDiv>
        <Heading>
          <h1>Welcome to the party!</h1>
        </Heading>

        <NewRoomModal />

        <Rooms />
      </WelcomeDiv>
    </>
  )
}

export default UserHome
