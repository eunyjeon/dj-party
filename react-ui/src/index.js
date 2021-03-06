import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import history from './history'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import * as serviceWorker from './serviceWorker'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import './index.css'

let PORT = process.env.PORT || 4000

// for queries & mutations
const httpLink = new HttpLink({
  // uri: 'http://localhost:4000',
  uri: `http://localhost:${PORT}/graphql`,
})

// for subscription & push notifications
const GRAPHQL_ENDPOINT = `ws://localhost:${PORT}/graphql`
const clientWS = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
})

const wsLink = new WebSocketLink(clientWS)

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const link = ApolloLink.from([terminatingLink])

//can we do redux with apollo? if not what do we do with needed react hooks?

const cache = new InMemoryCache()

const client = new ApolloClient({
  // uri: httpLink,
  // cache: cache,
  link,
  cache,
  clientState: {
    defaults: {
      user: {},
      messages: [],
      songs: [],
      rooms: [],
    },
    connectToDevTools: true,
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
