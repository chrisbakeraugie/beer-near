import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BreweryContainer from "./BreweryContainer";
import { GoogleApiWrapper } from "google-maps-react";
import { Loader } from "@googlemaps/js-api-loader";
import Start from "./Start";
import Loading from "./Loading";

const BREWERY_API_BASE = "https://api.openbrewerydb.org/breweries";
const BREWERY_API_BY_DISTANCE = "by_dist=";

const BeerNear = () => {
  /**
   * State management for the list of breweries
   */
  const [breweries, setBreweries] = React.useState([]);
  const [clientCoords, setClientCoords] = React.useState({});
  const [bounds, setBounds] = React.useState(null);
  const [breweryCount, setBreweryCount] = React.useState(0);
  const [btnPhrase, setBtnPhrase] = React.useState("Next Brewery");
  const [err, setErr] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const loader = new Loader({
    // eslint-disable-next-line no-undef
    apiKey: process.env.REACT_APP_GOOGLE_API
  });

  /**
   * Returns client browser coordinates (truncated to 4 decimal points)
   * @returns {object} {lat: number, lng: number}
   */
  const getClientCoords = async () => {
    setIsLoading(true);
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: Math.trunc(position.coords.latitude * 10000) / 10000,
          lng: Math.trunc(position.coords.longitude * 10000) / 10000
        });
      },
        (err) => {
          reject(err);
        }, { enableHighAccuracy: true, timeout: 30000 });
    });
  };

  const handleBounds = (newBounds) => {
    setBounds(newBounds);
  };

  /**
   * Increments (+1) breweryCount and resets count before it becomes longer than provided brewery list
   */
  const onNext = () => {
    if (breweries.length > breweryCount + 1) {
      setBreweryCount(breweryCount + 1);
    } else {
      alert("You have been too picky and therefore have failed. Please start over.");
      setBreweryCount(0);
    }
  };

  /**
   * Uses the provided client coords to fetch nearby breweries and alert user to errors.
   * Will fetch client coordinates if they haven't already specified an address
   */
  const handleStart = async () => {
    setIsLoading(true);
    if (clientCoords.lat !== undefined || clientCoords.lng !== undefined) {
      setTimeout(() => {
        fetch(`${BREWERY_API_BASE}?${BREWERY_API_BY_DISTANCE}${clientCoords.lat},${clientCoords.lng}`)
          .then(res => res.json()).then(result => {
            setBreweries(result);
            setErr(0);
            setIsLoading(false);
          });
      }, 2000);
    } else {
      try {
        const coords = await getClientCoords();
        setClientCoords(coords);
        fetch(`${BREWERY_API_BASE}?${BREWERY_API_BY_DISTANCE}${coords.lat},${coords.lng}`)
          .then(res => res.json()).then(result => {
            setBreweries(result);
            setErr(0);
            setIsLoading(false);
          });
      } catch (error) {
        setErr(error.code);
        if (error.code === 1) {
          alert("Your browser has blocked location services. Please enter your current address to continue.");
          setErr(0);
          setIsLoading(false);
        } else if (error.code === 2) {
          alert("Network connectivity issues. Please refresh your connection and try again later");
          setErr(0);
        } else if (error.code === 3) {
          alert("Took too long to get your location. Try typing in an address or waiting until better connected.");
          setErr(0);
        } else {
          alert("Something went wrong and we're not sure what it is. Please try again later.");
          setErr(0);
        }
      }
    }
  };

  const handleBtnPhrase = (phrase) => {
    setBtnPhrase(phrase);
  };


  /**
   * Sets clientCoords after place returned form google address search
   * @param {object} place (google geometry result from address search)
   */
  const handleAddressSelected = (place) => {
    if (!place.geometry) {
      alert("Please select address from dropdown list");
    } else {
      setClientCoords({
        lat: Math.trunc(place.geometry.location.lat() * 10000) / 10000,
        lng: Math.trunc(place.geometry.location.lng() * 10000) / 10000
      });
    }
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
    <div>
      {isLoading === true ?
        <Loading />
        :
        breweries.length > 0 && err === 0 ?
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
              makeBounds={makeBounds}
            />
          </div> :
          <Start
            handleStart={handleStart}
            handleAddressSelected={handleAddressSelected}
          />
      }
    </div>
  );
};


export default GoogleApiWrapper(
  // eslint-disable-next-line no-undef
  { apiKey: process.env.REACT_APP_GOOGLE_API }
)(BeerNear);
