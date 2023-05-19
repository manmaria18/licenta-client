import React from 'react';
import HouseView from '../house/HouseView';

const ProvidersList = ({ locations, history }) => {
    return (
        <div>
            {locations.map(location => (
                <HouseView key={location.id} location={location} history={history} />
            ))}
        </div>
    );
};

export default ProvidersList;