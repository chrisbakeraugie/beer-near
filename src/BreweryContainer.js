import React from "react";


/**
 * Brewery card
 * 
 * @prop brewery - a brewery object
 * @prop breweryCount - number of breweries counted through
 */
const BreweryContainer = ({ brewery, breweryCount }) => {
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
    <div class="container">
      <div class="Brewery-Component"></div>
      <div class="Map"></div>
      <div class="Name"></div>
      <div class="Address"></div>
      <div class="Phone"></div>
      <div class="Website"></div>
      <div class="Next-Brewery"></div>
    </div>
  );
};

export default BreweryContainer;