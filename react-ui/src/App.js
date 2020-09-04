import React from "react";
import "./App.css";
import { Navbar } from "./components";
import Routes from "./routes";
import { UserProvider } from './userContext'


function App(props) {
  return (
    <UserProvider>
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    </UserProvider>
  );
}

export default App;
