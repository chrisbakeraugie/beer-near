import React from "react";


/**
 * Brewery card
 * 
 * @prop brewery - a brewery object
 * @prop breweryCount - number of breweries counted through
 */
const BreweryContainer = ({ brewery, breweryCount, onNext }) => {
  /**
   * Returns ranking ("st", "nd", "rd") based on count in brewery
   */
  const distRank = () => {
    const endingDigit = Number(breweryCount.toString().split("")[breweryCount.toString().split("").length - 1]) + 1;
    if (endingDigit === 1 && breweryCount !== 10) {
      return ("st");
    } else if (endingDigit === 2 && breweryCount !== 11) {
      return ("nd");
    } else if (endingDigit === 3 && breweryCount !== 12) {
      return ("rd");
    }
    return ("th");
  };
  return (
    <div className="brewery-container">
      <div className="Map">THE MAP</div>
      <div className="Name"><h1>{brewery.name}</h1></div>
      <div className="Address"><h1>{brewery.street}, {brewery.city}, {brewery.state}</h1></div>
      <div className="Phone"><a href={"tel:" + brewery.phone}>{brewery.phone}</a></div>
      <div className="Website"><p><a href={brewery.website_url}>{brewery.website_url}</a></p></div>
      <div className="Next-Brewery"><button onClick={onNext}>Next Brewery</button></div>
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