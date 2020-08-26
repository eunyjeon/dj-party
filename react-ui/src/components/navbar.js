import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

const Heading = styled.div`
  background-color: black;
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.primary};
  font-size: 5rem;
  padding: 20px;
`

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.user.id)

  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            {/*           <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
            <Heading>CAPSTONE GOATS</Heading>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
