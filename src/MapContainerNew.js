import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: "50%",
  height: "50%"
};


export class MapContainer extends React.Component {


componentDidMount(){
  this.map = new this.props.google.maps.Map(this.refs.map, {
    lat: process.env.REACT_APP_DEVELOPMENT_LAT,
    lng: "-" + process.env.REACT_APP_DEVELOPMENT_LNG
  });
}

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        // initialCenter={
        //   {
        //     lat: process.env.REACT_APP_DEVELOPMENT_LAT,
        //     lng: "-" + process.env.REACT_APP_DEVELOPMENT_LNG
        //   }
        // }
        ref="map"
      />
    );
  }
}

export default GoogleApiWrapper(
  { apiKey: process.env.REACT_APP_GOOGLE_API }
)(MapContainer);