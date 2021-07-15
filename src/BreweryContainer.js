/* eslint-disable react/prop-types */
import React from "react";
import NextBrewery from "./NextBrewery";
import MapContainer from "./MapContainer";

/**
 * Brewery card
 * 
 * @prop brewery - a brewery object
 * @prop breweryCount - number of breweries counted through
 */
const BreweryContainer = ({
  brewery,
  breweryCount,
  onNext,
  clientCoords,
  handleBounds,
  bounds,
  handleBtnPhrase,
  btnPhrase,
  makeBounds
}) => {

  /**
 * Returns phone number (from props) with prettier display
 */
  const phoneNumber = () => {
    if (brewery.phone === null || brewery.phone === undefined) {
      return ("No phone listed");
    }
    const phoneArray = brewery.phone.toString().split("");
    if (brewery.phone.toString().split("").length === 10) {
      return (
        ["(", phoneArray[0], phoneArray[1], phoneArray[2], ")", " ", phoneArray[3],
          phoneArray[4], phoneArray[5], "-", phoneArray[6], phoneArray[7], phoneArray[8], phoneArray[9]].join("")
      );
    } else if (phoneArray.length === 11) {
      return (
        ["+", phoneArray[0], " ", "(", phoneArray[1], phoneArray[2], phoneArray[3], ")", " ", phoneArray[4],
          phoneArray[5], phoneArray[6], "-", phoneArray[7], phoneArray[8], phoneArray[9], phoneArray[10]].join("")
      );
    } else {
      return ("No phone listed");
    }
  };

  /**
   * Removes http, https, and www parts of the urls
   */
  // const shortenedUrl = () => {
  //   if (brewery.website_url === undefined || brewery.website_url === null) {
  //     return ("No website listed");
  //   }
  //   let shortenedUrl = brewery.website_url;
  //   shortenedUrl = shortenedUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  //   return shortenedUrl;
  // };

  const getBrewery = () => {
    if (breweryCount >= 20) {
      return {
        name: "There has been an error",
        street: null,
        city: null,
        state: null,
        phone: null,
        website_url: null
      };
    }
    return {
      name: brewery.name,
      street: brewery.street,
      city: brewery.city,
      state: brewery.state,
      phone: brewery.phone,
      website_url: brewery.website_url
    };
  };

  return (
    <div className="brewery-container">
      <div className="Map"><MapContainer
        clientCoords={clientCoords}
        brewery={brewery}
        handleBounds={handleBounds}
        bounds={bounds}
        makeBounds={makeBounds}
      /></div>
      <div className="Name"><h3 className="centered-text">{getBrewery().name}</h3></div>
      <div className="Address"><h3 className="centered-text">{getBrewery().street}, {getBrewery().city}, {getBrewery().state}</h3></div>
      <div className="Phone"><h5 className="centered-phone"><a className="phone-number" href={"tel:" + getBrewery().phone}>{phoneNumber()}</a></h5></div>
      <div className="Website"><h6 className="centered-website"><a href={getBrewery().website_url} target="_blank" rel="noreferrer" id="website-link">Website</a></h6></div>
      <div className="Next-Brewery"><NextBrewery onNext={onNext} breweryCount={breweryCount} handleBtnPhrase={handleBtnPhrase} btnPhrase={btnPhrase} /></div>
    </div>
  );

  /**
   * Template for grid (copy-paste)
   */
  //   <div className="brewery-container">
  //   <div className="Map"></div>
  //   <div className="Name"></div>
  //   <div className="Address"></div>
  //   <div className="Phone"></div>
  //   <div className="Website"></div>
  //   <div className="Next-Brewery"></div>
  // </div>
};

export default BreweryContainer;