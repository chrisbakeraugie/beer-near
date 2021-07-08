/* eslint-disable react/prop-types */
import "./App.css";
import React from "react";
import StartButton from "./StartButton";
// import MapContainer from "./MapContainer";
// import Brewery from "./BreweryContainer";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BreweryContainer from "./BreweryContainer";
import { GoogleApiWrapper } from "google-maps-react";
import { Loader } from "@googlemaps/js-api-loader";

const BREWERY_API_BASE = "https://api.openbrewerydb.org/breweries";
const BREWERY_API_BY_DISTANCE = "by_dist=";


function App() {

  /**
   * State management for the list of breweries
   */
  const [breweries, setBreweries] = React.useState([ // TODO: REMOVE INITIAL CONDITIONS BEFORE DEPLOYMENT
    // { "id": 14927, "obdb_id": "the-bronx-brewery-bronx", "name": "The Bronx Brewery", "brewery_type": "micro", "street": "856 E 136th St", "address_2": null, "address_3": null, "city": "Bronx", "state": "New York", "county_province": null, "postal_code": "10454-3509", "country": "United States", "longitude": "-73.91064054", "latitude": "40.801861", "phone": "7184021000", "website_url": "http://www.thebronxbrewery.com", "updated_at": "2018-08-24T00:00:00.000Z", "created_at": "2018-07-24T00:00:00.000Z" },
    // { "id": 12184, "obdb_id": "lic-beer-project-long-island-city", "name": "LIC Beer Project", "brewery_type": "micro", "street": "3928 23rd St", "address_2": null, "address_3": null, "city": "Long Island City", "state": "New York", "county_province": null, "postal_code": "11101-4817", "country": "United States", "longitude": "-73.942849", "latitude": "40.75063", "phone": "9178326840", "website_url": "http://licbeerproject.com", "updated_at": "2018-08-24T00:00:00.000Z", "created_at": "2018-07-24T00:00:00.000Z" },
    // {"id":11335,"obdb_id":"harlem-brewing-co-new-york","name":"Harlem Brewing Co","brewery_type":"contract","street":"2 W 123rd St","address_2":null,"address_3":null,"city":"New York","state":"New York","county_province":null,"postal_code":"10027-5623","country":"United States","longitude":"-73.94532799","latitude":"40.8058068","phone":"8885596735","website_url":"http://www.harlembrewingcompany.com","updated_at":"2018-08-24T00:00:00.000Z","created_at":"2018-07-24T00:00:00.000Z"},
    // {"id":10641,"obdb_id":"finback-brewery-queens","name":"Finback Brewery","brewery_type":"micro","street":"78-01 77th Ave","address_2":null,"address_3":null,"city":"Queens","state":"New York","county_province":null,"postal_code":"11385-7518","country":"United States","longitude":"-73.8732597","latitude":"40.7067227","phone":"7186288600","website_url":"http://www.finbackbrewery.com","updated_at":"2018-08-24T00:00:00.000Z","created_at":"2018-07-24T00:00:00.000Z"},
    // {"id":10619,"obdb_id":"fifth-hammer-brewing-company-long-island-city","name":"Fifth Hammer Brewing Company","brewery_type":"micro","street":"10-28 46th Ave","address_2":null,"address_3":null,"city":"Long Island City","state":"New York","county_province":null,"postal_code":"11101-5217","country":"United States","longitude":"-73.9515404","latitude":"40.7464921","phone":"7186632084","website_url":"http://www.fifthhammerbrewing.com","updated_at":"2018-08-24T00:00:00.000Z","created_at":"2018-07-24T00:00:00.000Z"},
    // {"id":15228,"obdb_id":"transmitter-brewing-long-island-city","name":"Transmitter Brewing","brewery_type":"micro","street":"5302 11th St","address_2":null,"address_3":null,"city":"Long Island City","state":"New York","county_province":null,"postal_code":"11101-5917","country":"United States","longitude":"-73.9511062","latitude":"40.7431826","phone":"6463788529","website_url":"http://www.transmitterbrew.com","updated_at":"2018-08-24T00:00:00.000Z","created_at":"2018-07-24T00:00:00.000Z"}
  ]);
  const [clientCoords, setClientCoords] = React.useState({});
  const [bounds, setBounds] = React.useState(null);
  const [breweryCount, setBreweryCount] = React.useState(0);
  const [btnPhrase, setBtnPhrase] = React.useState("Next Brewery");

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API
  });

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
    const DEVELOPMENT_LAT = process.env.REACT_APP_DEVELOPMENT_LAT;
    const DEVELOPMENT_LNG = process.env.REACT_APP_DEVELOPMENT_LNG;
    try {
      const coords = await getClientCoords();
      setClientCoords(coords);
      fetch(`${BREWERY_API_BASE}?${BREWERY_API_BY_DISTANCE}${coords.lat},${coords.lng}`)
        .then(res => res.json()).then(result => {
          setBreweries(result);
        });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        fetch(`${BREWERY_API_BASE}?${BREWERY_API_BY_DISTANCE}${DEVELOPMENT_LAT},-${DEVELOPMENT_LNG}`)
          .then(res => res.json()).then(result => {
            setBreweries(result);
          });
      } else {
        alert("Add a second option to get locations");
      }
    }
  };

  const handleBtnPhrase = (phrase) => {
    setBtnPhrase(phrase);
  };

  /**
   * Use Google API to create new bounds based on coordinates
   */
  const makeBounds = () => {
    let points = [
      { lat: Number(clientCoords.lat), lng: Number(clientCoords.lng) },
      { lat: Number(breweries[breweryCount].latitude), lng: Number(breweries[breweryCount].longitude) },
    ];

    let bounds;
    loader.load().then(() => {
      bounds = new window.google.maps.LatLngBounds();
      for (var i = 0; i < points.length; i++) {
        bounds.extend(points[i]);
      }
      handleBounds(bounds);
    });
  };

  /**
   * Update bounds when brewery count changes
   */
  React.useEffect(() => {
    if (breweries.length === 0) {
      return;
    }
    makeBounds();
  }, [breweryCount, breweries]);

  return (
    <div className="App">
      <Nav className="justify-content-center">
        <Nav.Item><Nav.Link href="#">Filler</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Items</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Don't work</Nav.Link></Nav.Item>
      </Nav>

      {breweries.length > 0 ?
        <div>
          <BreweryContainer
            brewery={breweries[breweryCount]}
            breweryCount={breweryCount}
            onNext={onNext}
            clientCoords={clientCoords}
            handleBounds={handleBounds}
            bounds={bounds}
            handleBtnPhrase={handleBtnPhrase}
            btnPhrase={btnPhrase}
          />
        </div> :
        <div id="start-div">
          <h1>Beer Near</h1>
          <h3>Find the closest brewery to you</h3>
          <StartButton handleStart={handleStart}></StartButton>
        </div>
      }
    </div>
  );
}
export default GoogleApiWrapper(
  { apiKey: process.env.REACT_APP_GOOGLE_API }
)(App);

// export default App;
