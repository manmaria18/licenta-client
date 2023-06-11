import React, { Component } from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

import {
    deleteHouse,
} from "../../util/APIUtils";

export class HouseView extends Component {
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
                this.props.onDeleteFailCallback(this.props.location.id, response)
            });
    }

    onEdit(id) {
        this.props.history.push('/house/update/' + id);
    }

    onOpen(id) {
        this.props.history.push('/house/view/' + id);
    }

    render() {
        return (
            <div className="col-1-2">
                <article className="post-wrap">
                    <div className="post">
                        <h2 className="entry-title"><a href="#0">{this.props.location.name}</a></h2>
                        <h4>{this.props.location.description}</h4>
                        <Button
                            className="btn read-more"
                            onClick={() => this.onOpen(this.props.location.id)}
                            style={{ backgroundColor: "green", color: "white" }}
                        >
                            Vizualizeaza facturi
                        </Button>
                        <Button
                            onClick={() => this.onDelete(this.props.location.id)}
                            style={{ margin: "20px", backgroundColor: "red", color: "white" }}
                        >
                            Sterge
                        </Button>
                        <Button
                            onClick={() => this.onEdit(this.props.location.id)}
                            style={{ backgroundColor: "blue", color: "white" }}
                        >
                            Editeaza
                        </Button>
                    </div>
                </article>
            </div>
        );
    }
}

export default withRouter(HouseView);
