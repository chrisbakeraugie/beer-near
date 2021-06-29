import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";


export class MapContainer extends React.Component {

  /**
   * Creates bounds using client browser and brewery coords
   */
  makeBounds = () => {
    let points = [
      { lat: Number(this.props.initialCenter.lat), lng: Number(this.props.initialCenter.lng) },
      { lat: Number(this.props.breweries[1].latitude), lng: Number(this.props.breweries[1].longitude) },
    ];

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
        google={this.props.google}
        style={{
          width: '50%',
          height: '50%'
        }}
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
        {this.props.breweries.map((brewery) => {
          return (
            <Marker
              key={brewery.id}
              title={brewery.name}
              position={{
                lat: brewery.latitude,
                lng: brewery.longitude
              }}
            />
          );
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper(
  { apiKey: process.env.REACT_APP_GOOGLE_API }
)(MapContainer);