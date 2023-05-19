import React from 'react';

import { MapView } from "../../components/map/MapView";
import FormItem from "antd/es/form/FormItem";
import CurveDownSvg from "../design/CurveDownSvg";

const LocationSection = ({ locations, onLocationChange }) => {
    return (
        <FormItem
            validateStatus={locations.length ? 'success' : ''}
            className="poll-form-row"
        >

            <div className="parallax-section parallax1">
                <div className="grid grid-pad">
                    <div className="col-1-1">
                        <MapView
                            height={800}
                            defaultCenter={[46.7833643, 23.5464727]}
                            defaultZoom={12}
                            onMapClick={onLocationChange}
                            locations={locations}
                        />
                    </div>
                </div>
            </div>
        </FormItem>
    );
};

export default LocationSection;