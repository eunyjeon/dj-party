import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

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
  const isLoggedIn = useSelector((state) => !!state.user.id)

  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <div>
      <StyledNav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            {/*             <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a> */}
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            {/*           <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
            <Heading>DJ PARTY</Heading>
            <Link to="/home">View All Rooms</Link>
          </div>
        )}
      </StyledNav>
    </div>
  )
}

export default Navbar
