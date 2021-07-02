import "./App.css";
import React from "react";
import StartButton from "./StartButton";
import MapContainer from "./MapContainer";

const BREWERY_API_BASE = "https://api.openbrewerydb.org/breweries";
const BREWERY_API_BY_DISTANCE = "by_dist=";


function App() {

  /**
   * State management for the list of breweries
   */
  const [breweries, setBreweries] = React.useState([]);
  const [clientCoords, setClientCoords] = React.useState({});
  const [bounds, setBounds] = React.useState(null);
  const [breweryCount, setBreweryCount] = React.useState(0);


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

  const handleBounds = (newBounds) => {
    setBounds(newBounds);
  };

  const onNext = () => {
    setBreweryCount(breweryCount + 1);
  };

  const handleStart = async () => {
    try {
      const coords = await getClientCoords();
      setClientCoords(coords);
      fetch(`${BREWERY_API_BASE}?${BREWERY_API_BY_DISTANCE}${coords.lat},${coords.lng}`)
        .then(res => res.json()).then(result => {
          setBreweries(result);
        });
    } catch (error) {
      alert("Add a second option to get locations");
    }
  };

  return (
    <div className="App">
      {breweries.length > 0 ?
        <div>
          <MapContainer
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "400px" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            clientCoords={clientCoords}
            brewery={breweries[breweryCount]}
          />
        </div> :
        <div>
          <StartButton handleStart={handleStart}></StartButton>
        </div>
      }
      <button type="button" onClick={onNext}>
        Next Thing
      </button>
    </div>
  );
}

export default App;
