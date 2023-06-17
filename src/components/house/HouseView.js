import React, { Component } from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

import {
    deleteHouse, getHouse
} from "../../util/APIUtils";

export class HouseView extends Component {
    constructor(props) {
        super(props);
        this.state={
            house: {
                name:"",
            }
        };
        this.onGetHouseById=this.onGetHouseById.bind(this);

    }

    componentDidMount() {
        this.onGetHouseById(this.props.location.houseId);
    }

    onGetHouseById(id){

        let house = getHouse(id);
        console.log("The house: ", house);
        this.setState({
            house: house,
        });
    };

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
                        <h2 className="entry-title"><a href="#0">{this.props.location.id+"ALOHA"}</a></h2>
                        <Button
                            className="btn read-more"
                            onClick={() => this.props.onClick && this.props.onClick(this.props.location.houseId|| this.props.location.id)}
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
