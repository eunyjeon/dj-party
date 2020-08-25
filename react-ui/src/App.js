import React from "react";
import "./App.css";
import { Navbar } from "./components";
import Routes from "./components/routes";

// import ThisApp from './components/howtologin'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
