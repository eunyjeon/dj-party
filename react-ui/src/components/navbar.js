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
