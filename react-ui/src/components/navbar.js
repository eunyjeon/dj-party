import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Heading = styled.div`
  font-size: 4rem;
  padding-top: 20px;
  color: black;
  text-shadow: 0 0 10px ${({ theme }) => theme.golden};
`

const StyledNav = styled.nav`
  background-color: black;
  font-family: 'Montserrat', sans-serif;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.purple};
`

const Navbar = () => {
  return (
    <div>
      <StyledNav>
        <div>
          <Heading>DJ PARTY</Heading>
          <StyledLink to="/home">View All Rooms</StyledLink>
        </div>
      </StyledNav>
    </div>
  )
}

export default Navbar

//navbar must show login before logging in; logout after logging out
//the info must be attached to the apollo context
