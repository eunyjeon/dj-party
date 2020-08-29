import React, { useEffect } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { LoginPage, UserHome, Room } from './components'

// import { me } from './store'
// import { useSelector, useDispatch } from 'react-redux'
import { gql, useQuery } from '@apollo/client'

const GET_ME = gql`
  query getMe {
    me {
      id
    }
  }
`

/**
 * COMPONENT
 */

const Routes = () => {
  // const isLoggedIn = useSelector((state) => !!state.user.id)
  // const dispatch = useDispatch()
  // const loadInitialData = () => {
  //   dispatch(me())
  // }

  const { loading, error, data } = useQuery(GET_ME)

  console.log('GET_ME data: ', data)

  if (loading)
    return (
      <>
        <h1>Loading...</h1>
      </>
    )

    if (error)
    return (
      <>
        <h1>Error! ${error.message}</h1>
      </>
    )

  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route exact path="/" component={LoginPage} />
      {data.getMe.id && (
        <Switch>
          {/* Routes placed here are only available after logging in */}
          <Route path="/home" component={UserHome} />
          <Route path="/room/:roomId" component={Room} />
        </Switch>
      )}
      {/* Displays our Login component as a fallback */}
      <Route path="/home" component={UserHome} />
      <Route path="/room/:roomId" component={Room} />
    </Switch>
  )
}

export default Routes
// export default withRouter(Routes)
