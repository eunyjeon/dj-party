import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { LoginPage, UserHome, SingleRoom } from './components'

/**
 * COMPONENT
 */

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/home" component={UserHome} />
      <Route path="/room/:roomId" component={SingleRoom} />
    </Switch>
  )
}

export default withRouter(Routes)

