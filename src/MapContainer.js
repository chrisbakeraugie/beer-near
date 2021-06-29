import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: null
    };
  }

  /**
   * Creates bounds using client browser and brewery coords
   */
  makeBounds = () => {
    let points = [
      { lat: Number(this.props.initialCenter.lat), lng: Number(this.props.initialCenter.lng) },
      { lat: Number(this.props.breweries[0].latitude), lng: Number(this.props.breweries[0].longitude) },
    ];

    let bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    this.setState({ bounds });
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
        bounds={this.state.bounds}
      >
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