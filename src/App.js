import "./App.css";
import React from "react";
// import { ReactComponent as BeerButton } from "./beer.svg";
import StartButton from "./StartButton";
// import MapContainer from "./MapContainer";

const BREWERY_API_BASE = "https://api.openbrewerydb.org/breweries";
const BREWERY_API_BY_DISTANCE = "by_dist=";

function App() {

  const [breweries, setBreweries] = React.useState([]);

  const handleStart = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const [lat, lng] = [Math.trunc(position.coords.latitude * 10000) / 10000, Math.trunc(position.coords.longitude * 10000) / 10000];
      console.log( lat + " " + lng);
      fetch(`${BREWERY_API_BASE}?${BREWERY_API_BY_DISTANCE}${lat},${lng}`)
      .then(res => res.json()).then(result => {
        setBreweries(result);
      });

    }, (err) => {
      console.log("Coordinates error " + err.code + " " + err.message);
      // TODO Error 1 - denied location services
      // TODO Error 2 - Network connectivity issues
      // TODO Error 3 - Timeout expired
      // TODO Error * - Random other error
    }, { enableHighAccuracy: true, timeout: 8000 });
  };
  
  return (
    <div className="App">
      <StartButton handleStart={handleStart}></StartButton>

      {breweries.map(brewery => {
        return(
          <div key={brewery.id}>{brewery.name}</div>
        );
      })}

    </div>
  );
}

export default App;
