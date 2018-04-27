import React, {Component} from "react";
import GoogleMapReact from 'google-map-react';

class GoogleMap extends Component {
    static defaultProps = {
        center: {lat: 49.163386, lng: 19.999959},
        zoom: -3
    };

    render() {
        return (
            <GoogleMapReact defaultCenter={this.props.center}
                            center={this.props.center}
                            defaultZoom={this.props.zoom}
                            bootstrapURLKeys={{key: 'AIzaSyBhogmDOm3jU1RERtYAc0S_JR5o3JoYfBc'}}
                            //onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
                            yesIWantToUseGoogleMapApiInternals={true}>
                {this.props.markers !== undefined ? this.props.markers : null}
            </GoogleMapReact>
        )
    }
}


export default GoogleMap;

