import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

export class MapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
          lat: this.props.initialCenter.lat,
          lng: this.props.initialCenter.lng,
        }}>
        {this.props.breweries.map((brewery) => {
          console.log({
            key: brewery.id,
            title: brewery.name,
            position:
            {
              lat: brewery.lat,
              lng: brewery.lng
            }
          });
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