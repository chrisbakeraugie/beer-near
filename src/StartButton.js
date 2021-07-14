import React from "react";
import BeerIcon from "./BeerIcon";
import "./index.css";

const StartButton = ({handleStart}) => (
  <div>
    <button onClick={handleStart} className="start-button-btn" style={{ 
      height: "200px", 
      width: "200px",
      borderStyle: "none",
      background: "none",
     }}>
      <BeerIcon></BeerIcon>
    </button>
  </div>
);

export default StartButton;