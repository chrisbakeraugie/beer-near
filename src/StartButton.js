/* eslint-disable react/prop-types */
import React from "react";
import BeerIcon from "./BeerIcon";



const StartButton = ({ handleStart }) => (
  <div className="start-button-div">
    <button onClick={handleStart} style={{
      height: "200px",
      width: "200px",
      borderStyle: "none",
      background: "none"
    }}>
      <BeerIcon></BeerIcon>
    </button>
  </div>
);

export default StartButton;