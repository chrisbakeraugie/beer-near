import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React from "react";

const MapContainer = withScriptjs(withGoogleMap((props) => {

  return (
    <GoogleMap
      defaultCenter={{ lat: props.clientCoords.lat, lng: props.clientCoords.lng }}
    >

      {props.isMarkerShown && <Marker position={{ lat: props.clientCoords.lat, lng: props.clientCoords.lng }} />}
    </GoogleMap>
  );
}));

export default MapContainer;