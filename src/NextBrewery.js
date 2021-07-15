/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "react-bootstrap";

const NextBrewery = ({ onNext, breweryCount, handleBtnPhrase, btnPhrase }) => {
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

  const niceResponses = [
    "Next option please!",
    "Next closest brewery",
    "There's more!",
    "Not your vibe?",
    "Plenty more to check",
    "Looking for something else?",
    "Try again?",
    "Keep going",
    "Been there before?",
    "Don't worry, there're more options!"
  ];

  const impatientResponses = [
    "Remember, closest brewery, not best",
    "Are you sure this isn't enough",
    "Starting to get a bit far away, aren't we?",
    "You should reconsider that last one, maybe",
    "Let's stay on task: CLOSEST breweries",
    "Stick with this one, maybe",
    "Let's call it here.",
    "Nah, this is the one",
    "Let's just start walking and see how we feel",
    "Give this one a chance",
    "I just feel like you're going through a lot of options"
  ];

  const rudeResponses = [
    "Bruh.",
    "...Seriously?",
    "Look at moneybags, wants to spend $80 on a Lyft",
    "There's a finite number of breweries in the world",
    "So much for supporting LOCAL businesses",
    "Is this one even in the same timezone to you",
    "You are picky.",
    "I think you've mistaken me for Google.",
    "There's no prize for finding the farthest brewery away from you",
    "Am I a joke to you?",
    "Are you looking for a beer, or just bored",
    "BRUH.",
    `You know this is the ${breweryCount + 1}${distRank()} brewery you've seen, right?`
  ];

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const nextText = () => {
    if (breweryCount === 0) {
      return ("Next Brewery");
    } else if (breweryCount > 0 && breweryCount < 7) {
      return (niceResponses[getRandomInt(niceResponses.length)]);
    } else if (breweryCount >= 7 && breweryCount < 14) {
      return (impatientResponses[getRandomInt(impatientResponses.length)]);
    }
    return (rudeResponses[getRandomInt(rudeResponses.length)]);
  };

  React.useEffect(() => {
    handleBtnPhrase(nextText());
  }, [breweryCount]);
  return (
    <Button onClick={onNext} size="lg" variant="outline-dark" block style={{ "whiteSpace": "unset" }}>{btnPhrase}</Button>
  );
};

export default NextBrewery;