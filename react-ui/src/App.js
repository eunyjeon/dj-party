<<<<<<< HEAD
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import RenderApp from './client'
import ThisApp from './components/howtologin'

function App() {
  // const [message, setMessage] = useState(null);
  // const [isFetching, setIsFetching] = useState(false);
  // const [url, setUrl] = useState('/api');

  // const fetchData = useCallback(() => {
  //   fetch(url)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`status ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(json => {
  //       setMessage(json.message);
  //       setIsFetching(false);
  //     }).catch(e => {
  //       setMessage(`API call failed: ${e}`);
  //       setIsFetching(false);
  //     })
  // }, [url]);
=======
import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RenderApp from "./client";

function App() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState("/api");

  const fetchData = useCallback(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setMessage(json.message);
        setIsFetching(false);
      })
      .catch((e) => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      });
  }, [url]);
>>>>>>> 08fc57fa29fe78240b8bc3ebf9ae82fc89f5fe27

  // useEffect(() => {
  //   setIsFetching(true);
  //   fetchData();
  // }, [fetchData]);

  return (
    <div className="App">
<<<<<<< HEAD
      {/* <ThisApp /> */}
      <a href="/auth/spotify">Login with Spotify Here</a>
=======
      <RenderApp />
>>>>>>> 08fc57fa29fe78240b8bc3ebf9ae82fc89f5fe27
    </div>
  );
}

export default App;
