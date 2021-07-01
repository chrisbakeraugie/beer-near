import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";


export class MapContainer extends React.Component {

  /**
   * Creates bounds using client browser and brewery coords
   */
  makeBounds = () => {
    let points = [
      { lat: Number(this.props.initialCenter.lat), lng: Number(this.props.initialCenter.lng) },
      { lat: Number(this.props.brewery.latitude), lng: Number(this.props.brewery.longitude) },
    ];

    console.log(points)
    let bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    // this.setState({ bounds });
    this.props.handleBounds(bounds);
  }
  
  /**
   * Called when map is loaded and ready on the page
   */
  onReady = () => {
    this.makeBounds();
  }
  
  render() {
    return (
      <Map
        containerStyle={{
          position: "absolute",
          width: "50%",
          height: "50%"
        }}
        google={this.props.google}
        onReady={this.onReady}
        bounds={this.props.bounds}
        
      >
        <Marker
          title="You"
          position={{
            lat: this.props.initialCenter.lat,
            lng: this.props.initialCenter.lng
          }}
        />
        <Marker
          title={this.props.brewery.name}
          position={{
            lat: this.props.brewery.latitude,
            lng: this.props.brewery.longitude
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper(
  { apiKey: process.env.REACT_APP_GOOGLE_API }
)(MapContainer);