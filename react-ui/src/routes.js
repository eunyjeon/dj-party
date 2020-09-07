import React, { useContext } from 'react'
import UserContext from './userContext'
import { withRouter, Route, Switch } from 'react-router-dom'
import { LoginPage, UserHome, SingleRoom } from './components'

/**
 * COMPONENT
 */

const Routes = () => {
  const isLoggedIn = useContext(UserContext)

  return (
    <Switch>
     <Route exact path="/" component={LoginPage} />
      {isLoggedIn && (
      <Switch>
      <Route path="/home" component={UserHome} />
      <Route path="/room/:roomId" component={SingleRoom} />
      </Switch>
      )}
    </Switch>
  )
}

export default withRouter(Routes)

