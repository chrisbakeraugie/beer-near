import React from "react";
import StartButton from "./StartButton";
import AutoComplete from "react-google-autocomplete";

const Start = ({ handleStart, handleAddressSelected }) => {
  return (
    <div className="start-div">
      <h1>Beer Near</h1>
      <h3>Find the closest brewery to you</h3>
      <StartButton handleStart={handleStart} />
      <AutoComplete
        apiKey={process.env.REACT_APP_GOOGLE_API}
        options={{
          types: ["address"],
          fields: ["geometry"]
        }}
        onPlaceSelected={handleAddressSelected}
      />
    </div>
  );
};

export default Start;