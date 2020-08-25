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

const cache = new InMemoryCache({});

const client = new ApolloClient({
  cache: cache,
  clientState: {
    defaults: {
      messages: [],
      songs: [],
    },
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
