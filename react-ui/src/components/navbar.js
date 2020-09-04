import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Heading = styled.div`
  font-size: 4rem;
  padding-top: 20px;
`

const StyledNav = styled.nav`
  background-color: black;
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.primary};
`
// const SpotifyButton = styled.a`
//   padding: 10px 30px 10px 30px;
//   margin-top: 500px;
//   background-color: rgb(36, 212, 78);
//   font-family: "Montserrat", sans-serif;
//   border-radius: 30px;
//   color: white;
// `;

const Navbar = () => {
  return (
    <div>
      <StyledNav>
        <div>
          <Heading>DJ PARTY</Heading>
          <Link to="/home">View All Rooms</Link>
        </div>
      </StyledNav>
    </div>
  )
}

export default Navbar


//navbar must show login before logging in; logout after logging out
//the info must be attached to the apollo context
