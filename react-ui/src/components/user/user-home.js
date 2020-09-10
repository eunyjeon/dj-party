import React from 'react'
import styled from 'styled-components'
import { Rooms } from '..'
import NewRoomModal from '../createNewRoom/newRoomModal'


export const PageDiv = styled.div`
  padding-top: 140px;
  background-image: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.cherry},
    ${({ theme }) => theme.golden}
  );
  font-family: 'Montserrat', sans-serif;
`
export const Heading = styled.div`
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
    <PageDiv>
      <Heading>
        <h1>Welcome to the party!</h1>
      </Heading>

      <NewRoomModal />

      <Rooms />
    </PageDiv>
  )
}

export default UserHome
