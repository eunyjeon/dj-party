import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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