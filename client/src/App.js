import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <div style={{ backgroundColor: "rgb(0, 150, 255)", marginTop: "0px" }}> */}
      <div style={{ backgroundColor: "rgb(0, 150, 255)", padding: "10px", textAlign: "center", color: "white" }}>
        <label>Vacation site - Written by Shahar Avshalom All rights reserved </label>
      </div>
    </div>
  );
}

export default App;
