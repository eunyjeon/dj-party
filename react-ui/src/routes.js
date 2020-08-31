import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch } from 'react-router-dom'
import { LoginPage, UserHome, SingleRoom } from './components'
import { me } from './store'
import { useSelector, useDispatch } from 'react-redux'

/**
 * COMPONENT
 */

const Routes = () => {
  const isLoggedIn = useSelector((state) => !!state.user.id)
  const dispatch = useDispatch()
  const loadInitialData = () => {
    dispatch(me())
  }

  useEffect(() => {
    loadInitialData()
  })

  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route exact path="/" component={LoginPage} />
      {isLoggedIn && (
        <Switch>
          {/* Routes placed here are only available after logging in */}
          <Route path="/home" component={UserHome} />
          {/* <Route path="/room/:roomId" component={Room} /> */}
          <Route path="/room/:roomId" component={SingleRoom} />
        </Switch>
      )}
      {/* Displays our Login component as a fallback */}
      <Route path="/home" component={UserHome} />
      {/* <Route path="/room/:roomId" component={Room} /> */}
      <Route path="/room/:roomId" component={SingleRoom} />
    </Switch>
  )
}

export default withRouter(Routes)

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
