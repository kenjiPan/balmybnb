import React from "react";
import MarkerManager from "../../util/marker_manager";
import { withRouter } from "react-router-dom";

class SpotMap extends React.Component {
  constructor(props) {
    super(props);
  }

  // lat: 34.019956, lng: -118.824270

  componentDidMount() {
    const query = this.props.location.search;
    const search = new URLSearchParams(query);
    this.lat = parseFloat(search.get("lat"));
    this.lng = parseFloat(search.get("lng"));
    // set map location
    const mapOptions = {
      center: { lat: this.lat, lng: this.lng },
      zoom: 10
    };

    // wrap the mapDOMNode in a Google Map
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);
    this.MarkerManager.updateMarkers(this.props.spots);

    google.maps.event.addListener(this.map, "idle", () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };
      this.props.updateFilter("bounds", bounds);
    });
  }

  componentWillReceiveProps(nextProps) {
    const oldLat = this.lat;
    const oldLng = this.lng;

    const query = this.props.location.search;
    const search = new URLSearchParams(query);
    this.lat = parseFloat(search.get("lat"));
    this.lng = parseFloat(search.get("lng"));
    if (this.lat !== oldLat || this.lng !== oldLng) {
      const mapOptions = {
        center: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 10
      };

      this.map = new google.maps.Map(this.mapNode, mapOptions);
      this.MarkerManager = new MarkerManager(this.map);
      this.MarkerManager.updateMarkers(this.props.spots);

      google.maps.event.addListener(this.map, "idle", () => {
        const { north, south, east, west } = this.map.getBounds().toJSON();
        const bounds = {
          northEast: { lat: north, lng: east },
          southWest: { lat: south, lng: west }
        };
        this.props.updateFilter("bounds", bounds);
      });
    }
  }

  componentWillUpdate() {
    this.MarkerManager.updateMarkers(this.props.spots);
  }

  componentDidUpdate() {
    this.MarkerManager.updateMarkers(this.props.spots);
  }

  render() {
    return (
      <section className="spot-index-right-map-section">
        <div className="spot-index-right-map">
          <div id="map-container" ref={map => (this.mapNode = map)} />
        </div>
      </section>
    );
  }
}

export default withRouter(SpotMap);
