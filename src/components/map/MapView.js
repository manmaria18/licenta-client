import React, { Component } from 'react';
import {Map, Marker} from "pigeon-maps";
import {maptiler} from "pigeon-maps/providers";


export class MapView extends Component {

    render() {
        console.log("MAP VIEW", this.props.locations)

        console.log(this.props.locations)
        return (
            <Map height={this.props.height}
                 defaultCenter={[46.7833643, 23.5464727]}
                 defaultZoom={this.props.defaultZoom}
                 proider={maptiler}
                 onClick={this.props.onMapClick}

            >

                { this.props.locations &&
                    this.props.locations.map(location =>
                    <Marker width={50}
                         anchor={[location.latitude, location.longitude]}
                         onClick={() => this.props.onClick && this.props.onClick(location.idHome || location.id)}
                    /> )

                }

                />
            </Map>
        );
    }
}