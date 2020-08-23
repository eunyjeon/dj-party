import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

//Right now, redux is not set up to check if a user is logged in.  This because we are going to use Apollo to query for user information.  As of now, once you log into Spotify, you'll be redirected to this page.

/**
 * COMPONENT
 */
export const UserHome = props => {

  return (
    <div>
      <h3>Welcome!</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     spotifyId: state.user.spotifyId
//   }
// }

export default UserHome

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   spotifyId: PropTypes.string
// }