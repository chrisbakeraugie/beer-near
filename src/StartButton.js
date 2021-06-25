import React from "react";
import BeerIcon from "./BeerIcon";

const StartButton = ({handleStart}) => (
  <div>
    <button onClick={handleStart} style={{ height: "200px", width: "200px" }}>
      <BeerIcon></BeerIcon>
    </button>
  </div>
);

export default StartButton;