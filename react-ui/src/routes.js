import React, { useEffect } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { LoginPage, UserHome } from './components'
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
      <Route exact path="/" component={UserHome} />
      {isLoggedIn && (
        <Switch>
          {/* Routes placed here are only available after logging in */}
          <Route path="/home" component={UserHome} />
        </Switch>
      )}
      {/* Displays our Login component as a fallback */}
      <Route component={UserHome} />
    </Switch>
  )
}

export default withRouter(Routes)
