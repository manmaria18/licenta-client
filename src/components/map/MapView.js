import React, { Component } from 'react';
import {Map, Marker, Overlay, Draggable} from "pigeon-maps";
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

                    <Draggable width={50}
                         anchor={[location.latitude, location.longitude]}

                    ><img src="https://www.clker.com/cliparts/Y/s/N/L/x/Y/home-md.png" alt="House Icon 3d Png, Transparent Png@kindpng.com" width={50} height={45} onClick={() => this.props.onClick && this.props.onClick(location.idHome || location.id)}/>

                    </Draggable>

                    )

                }

                />
            </Map>
        );
    }
}