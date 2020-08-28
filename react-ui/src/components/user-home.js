import React from 'react'
import styled from 'styled-components'
import { Rooms } from './'
<<<<<<< HEAD
=======
import NewRoomModal from './createNewRoom/newRoomModal'
>>>>>>> c5d4a580af8ef614b8271d461cf97b741b68b437

//Right now, redux is not set up to check if a user is logged in.  This because we are going to use Apollo to query for user information.  As of now, once you log into Spotify, you'll be redirected to this page.

const WelcomeDiv = styled.div`
  background-color: ${({ theme }) => theme.primary};
  font-family: 'Cardo', serif;
`
const Heading = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.accent};
`

/**
 * COMPONENT
 */
export const UserHome = (props) => {

  return (
    <>
      <WelcomeDiv>
        <Heading>
          <h1>Welcome Username</h1>
        </Heading>

        <NewRoomModal />

        <Rooms />
      </WelcomeDiv>
    </>
  )
}

export default UserHome
