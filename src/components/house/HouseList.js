import React from 'react';
import HouseView from './HouseView';

const HousesList = ({ locations, history, currentUser, onDeleteSuccessCallback, onDeleteFailCallback, onClick }) => {
    return (
        <div>
            {locations.map(location => (
                <HouseView
                    key={location.id}
                    location={location}
                    history={history}
                    currentUser={currentUser}
                    onClick={onClick}
                    onDeleteSuccessCallback={onDeleteSuccessCallback}
                    onDeleteFailCallback={onDeleteFailCallback}
                />
            ))}
        </div>
    );
};

export default HousesList;
