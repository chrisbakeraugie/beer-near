import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";


export class MapContainer extends React.Component {

  // /**
  //  * Creates bounds using client browser and brewery coords
  //  */
  // makeBounds = () => {
  //   let points = [
  //     { lat: Number(this.props.clientCoords.lat), lng: Number(this.props.clientCoords.lng) },
  //     { lat: Number(this.props.brewery.latitude), lng: Number(this.props.brewery.longitude) },
  //   ];

  //   let bounds = new this.props.google.maps.LatLngBounds();
  //   for (var i = 0; i < points.length; i++) {
  //     bounds.extend(points[i]);
  //   }
  //   this.props.handleBounds(bounds);
  // }

  // /**
  //  * Called when map is loaded and ready on the page
  //  */
  // onReady = () => {
  //   this.makeBounds();
  // }

  psuedoResponsive = () => {
    if (window.innerWidth < 900) {
      return {
        width: "80vw",
        height: "70vh"
      }
    } else {
      return {
        width: "40vw",
        height: "65vh"
      }
    }
  }

  onReady = () => {
    this.props.makeBounds()
  }

  render() {
    return (
      <Map
        containerStyle={{
          position: "relative",
          width: this.psuedoResponsive().width,
          height: this.psuedoResponsive().height,
          margin: "auto"
        }}
        google={this.props.google}
        onReady={this.onReady}
        bounds={this.props.bounds}
        zoomControl={false}
        mapTypeControl={false}
        scaleControl={false}
        streetViewControl={false}
        rotateControl={false}
        fullscreenControl={false}
      >
        <Marker
          title="You"
          position={{
            lat: this.props.clientCoords.lat,
            lng: this.props.clientCoords.lng
          }}
          icon={{
            url:"https://cdn.mapmarker.io/api/v1/pin?text=You&size=80&background=%23373737&color=%23FFFFF&voffset=2&hoffset=1",
            scaledSize: new this.props.google.maps.Size(50, 50)
          }}
        />
        <Marker
          title={this.props.brewery.name}
          position={{
            lat: this.props.brewery.latitude,
            lng: this.props.brewery.longitude
          }}
          icon={{
            url: "https://cdn.mapmarker.io/api/v1/font-awesome/v4/pin?icon=fa-beer&size=80&background=%23000000&color=%23FB9E00&hoffset=0",
            scaledSize: new this.props.google.maps.Size(50, 50)
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper(
  { apiKey: process.env.REACT_APP_GOOGLE_API }
)(MapContainer);