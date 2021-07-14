import React from "react";
import StartButton from "./StartButton";
import AutoComplete from "react-google-autocomplete";

const Start = ({ handleStart, handleAddressSelected }) => {
  return (
    <div className="start-div">
      <h1>Beer Near</h1>
      <h3>Find the closest brewery to you</h3>
      <StartButton handleStart={handleStart} />
      <h6 className="description">Click the button above to start!<br/>
      To use a different location, search by address first</h6>
      <AutoComplete
      id="autocomplete-input"
        apiKey={process.env.REACT_APP_GOOGLE_API}
        options={{
          types: ["address"],
          fields: ["geometry"]
        }}
        onPlaceSelected={handleAddressSelected}
        placeholder="Enter your current address"
      />

    </div>
  );
};

export default Start;