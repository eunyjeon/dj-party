import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import history from './history'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import * as serviceWorker from './serviceWorker'
import { ApolloClient,  InMemoryCache, ApolloProvider } from '@apollo/client'

//can we do redux with apollo? if not what do we do with needed react hooks?
import { Provider } from 'react-redux'
import store from './store'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: cache,
  clientState: {
    defaults: {
      messages: [],
      songs: [],
      rooms: []
    },
  connectToDevTools: true
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
