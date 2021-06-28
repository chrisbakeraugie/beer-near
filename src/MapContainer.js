import React from "react";
import {Map, GoogleApiWrapper, Marker} from "google-maps-react";

export class MapContainer extends React.Component {
  render() {
    return (
      <Map 
      google={this.props.google} 
      zoom={14}
      initialCenter={{
        lat:this.props.initialCenter.lat,
        lng:this.props.initialCenter.lng,
      }}><Marker
      title="Randolph's Beer"
      position={{ 
        lat:this.props.initialCenter.lat,
        lng:this.props.initialCenter.lng
      }}></Marker></Map>
    );
  }
}

export default GoogleApiWrapper(
  {apiKey: process.env.REACT_APP_GOOGLE_API}
)(MapContainer);