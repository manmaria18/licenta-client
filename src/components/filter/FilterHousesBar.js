import React, { Component } from 'react';
import {Button} from "antd";

import {deleteHouse} from "../../util/APIUtils";

export class FilterHouseBar extends Component {

    constructor(props) {
        super(props);

    }
    onDelete(id) {
        deleteHouse(id)
            .then((result) => {
                console.log("success delete")
                this.props.onDeleteSuccessCallback(this.props.location.id);
            })
            .catch((response, error) => {
                console.log("fail delete")
                this.props.onDeleteFailCallback(this.props.location.id, error)
            })
    }


    render() {

        return (
            <div>

            </div>
        );
    }
}

export default FilterHouseBar;