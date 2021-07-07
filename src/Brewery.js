import React from "react";

/**
 * Brewery card
 * 
 * @prop brewery - a brewery object
 * @prop breweryCount - number of breweries counted through
 */
const Brewery = ({ brewery, breweryCount }) => {
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
    <div>
      <h1>The {breweryCount + 1}{distRank()} closest brewery to you is {brewery.name}</h1>
      <h2>The address is {brewery.street}, {brewery.city}, {brewery.state}</h2>
      <p>You can call them at {brewery.phone} (maybe double check that one) or visit their website at <a target="_blank" href={brewery.website_url} rel="noreferrer">{brewery.website_url}</a></p>
    </div>
  );
};

export default Brewery;