import React, { Component } from 'react';
import {Button} from "antd";

import {
    deleteHouse,
    addFavoriteHouse,
    removeFavoriteHouse

} from "../../util/APIUtils";

export class HouseView extends Component {

    constructor(props) {
        super(props);

        this.isOwner = this.isOwner.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
        this.hasRights = this.hasRights.bind(this);
        this.isDeleteButtonDisplayed = this.isDeleteButtonDisplayed.bind(this);
        this.onLiked = this.onLiked.bind(this);
        this.onDisliked = this.onDisliked.bind(this);
        this.isEditButtonDisplayed = this.isEditButtonDisplayed.bind(this);

        this.state = {
            liked: false
        }
    }

    componentDidMount() {
        this.setState({
            liked: this.props.location.liked
        })
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
            })
    }

    onEdit(id) {
        this.props.history.push('/house/edit/' + id);
    }

    onOpen(id) {
        this.props.history.push('/house/view/' + id);
    }

    onLiked(id) {
        console.log("Liked", id)
        addFavoriteHouse(this.props.location.id)
        .then(result => {
            this.setState({
                liked: true,
            });
        }).catch(error => {
            console.log(error)
        })
    }

    onDisliked(id) {
        console.log("Disliked", this.props.location.id)
        removeFavoriteHouse(id)
        .then((result) => {
            this.setState({
                liked: false,
            });
        }).catch(error => {
            console.log(error)
        })
    }

    isOwner() {

        return this.props.currentUser != null
            && this.props.location.userDto != null
            && this.props.location.userDto.username != null
            && this.props.currentUser.username == this.props.location.userDto.username
    }

    isAdmin() {
        return this.props.currentUser != null
            && this.props.currentUser.admin;
    }

    hasRights() {
        return this.isOwner() || this.isAdmin()
    }

    isDeleteButtonDisplayed() {
        return this.props.onDeleteSuccessCallback != null
        && this.props.onDeleteFailCallback != null
        && this.hasRights()

    }

    isEditButtonDisplayed() {
        return this.hasRights()

    }

    render() {

        console.log("render", this.props.location)
        return (
            <div className="col-1-2">
                <article className="post-wrap">
                    {/*<div className="post-img">*/}
                    {/*    <a href="#0">*/}
                    {/*        <div className="post-background"*/}
                    {/*             onClick={() => this.onOpen(this.props.location.id)}*/}
                    {/*             alt=""/>*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                    <div className="post">
                        <h2 className="entry-title"><a href="#0">{this.props.location.name}</a></h2>
                        <h4>{this.props.location.description}</h4>
                        <Button className="btn read-more"
                                onClick={() => this.onOpen(this.props.location.id)}
                                style={{backgroundColor: "green", color: "white"}}

                        >
                            Vizualizeaza facturi</Button>

                        {!this.isDeleteButtonDisplayed() ? null :
                            <Button
                                onClick={() => this.onDelete(this.props.location.id)}
                                style={{ margin: "20px", backgroundColor: "red", color: "white"}}

                            >
                                Sterge
                            </Button>

                        }

                        {!this.isEditButtonDisplayed() ? null :
                            <Button
                                onClick={() => this.onEdit(this.props.location.id)}
                                style={{backgroundColor: "blue", color: "white"}}
                            >
                                Editeaza
                            </Button>

                        }
                    </div>
                </article>
            </div>
        );
    }
}

export default HouseView;