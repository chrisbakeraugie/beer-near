import React from "react";
import StartButton from "./StartButton";

const Start = ({ handleStart, handleAddressChange }) => {
  return (
    <div className="start-div">
      <h1>Beer Near</h1>
      <h3>Find the closest brewery to you</h3>
      <StartButton handleStart={handleStart} />
      <input type="text" onChange={handleAddressChange} placeholder="Your current address"/>
    </div>
  );
};

export default Start;