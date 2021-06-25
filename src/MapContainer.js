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
      title={this.props.title}
      position={{ 
        lat:this.props.position.lat,
        lng:this.props.position.lng
      }}></Marker>
      <Marker
      title={this.props.title}
      position={{ 
        lat:this.props.initialCenter.lat,
        lng:this.props.initialCenter.lng
      }}></Marker></Map>
    );
  }
}

export default GoogleApiWrapper(
  {apiKey: ""} // TODO - Setup .env variables
)(MapContainer);