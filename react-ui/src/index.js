import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router } from "react-router-dom";
import history from "./history";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import * as serviceWorker from "./serviceWorker";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

//can we do redux with apollo? if not what do we do with needed react hooks?
import { Provider } from "react-redux";
import store from "./store";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  clientState: {
    defaults: {
      messages: [],
      songs: [],
      rooms: []
    },
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
