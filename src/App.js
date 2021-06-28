import "./App.css";
import React from "react";
// import dotenv from 'dotenv';
// import { ReactComponent as BeerButton } from "./beer.svg";
import StartButton from "./StartButton";
import MapContainer from "./MapContainer";
import { get } from "http";

// // eslint-disable-next-line no-undef
// const dotenvConfig =  dotenv.config({path: `../${process.env.NODE_ENV}.env`});

// if(dotenvConfig.error){
//   throw new Error();
// }


const BREWERY_API_BASE = "https://api.openbrewerydb.org/breweries";
const BREWERY_API_BY_DISTANCE = "by_dist=";

function App() {

  /**
   * State management for the list of breweries
   */
  const [breweries, setBreweries] = React.useState([]);

  /**
   * Returns client browser coordinates (truncated to 4 decimal points)
   * @returns {object} {lat: number, lng: number}
   */
  const getClientCoords = async () => {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: Math.trunc(position.coords.latitude * 10000) / 10000,
          lng: Math.trunc(position.coords.longitude * 10000) / 10000
        });
      },
        (err) => {
          // TODO Error 1 - denied location services
          // TODO Error 2 - Network connectivity issues
          // TODO Error 3 - Timeout expired
          // TODO Error * - Random other error
          reject(err);
        }, { enableHighAccuracy: true, timeout: 30000 });
    });
  };

  const handleStart = async () => {
    try {
      const clientCoords = await getClientCoords();
      fetch(`${BREWERY_API_BASE}?${BREWERY_API_BY_DISTANCE}${clientCoords.lat},${clientCoords.lng}`)
        .then(res => res.json()).then(result => {
          setBreweries(result);
        });
    } catch (error) {
      alert("Add a second option to get locations");
    }
  };

  return (
    <div className="App">
      <StartButton handleStart={handleStart}></StartButton>


      {breweries.map(brewery => {
        return (
          <div key={brewery.id}>{brewery.name}</div>
        );
      })}

    </div>
  );
}

export default App;
