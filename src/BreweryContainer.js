import React from "react";
import NextBrewery from "./NextBrewery";

/**
 * Brewery card
 * 
 * @prop brewery - a brewery object
 * @prop breweryCount - number of breweries counted through
 */
const BreweryContainer = ({ brewery, breweryCount, onNext }) => {

  /**
 * Returns phone number (from props) with prettier display
 */
  const phoneNumber = () => {
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
  const shortenedUrl = () => {
    let shortenedUrl = brewery.website_url;
    shortenedUrl = shortenedUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
    return shortenedUrl;
  };

  return (
    <div className="brewery-container">
      <div className="Map">THE MAP</div>
      <div className="Name"><h1 className="centered-text">{brewery.name}</h1></div>
      <div className="Address"><h1 className="centered-text">{brewery.street}, {brewery.city}, {brewery.state}</h1></div>
      <div className="Phone"><h5 className="centered-text"><a className="phone-number" href={"tel:" + brewery.phone}>{phoneNumber()}</a></h5></div>
      <div className="Website"><h6 className="centered-text"><a href={brewery.website_url} target="_blank">{shortenedUrl()}</a></h6></div>
      <div className="Next-Brewery"><NextBrewery onNext={onNext} breweryCount={breweryCount}/></div>
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