import "./App.css";
import React from "react";
import MapContainer from "./MapContainer";

const location = {
  address: "82 Prospect St, Brooklyn, NY 11201",
  lat: 40.70033337582707, 
  lng:-73.98757818669164
};


function App() {
  return (
    <div className="App">
    <div style={{height: "50px"}}></div>
      <MapContainer initialCenter={location}></MapContainer>
    </div>
  );
}

export default App;
