import React, { Component } from 'react';
import ReactPannellum, {addScene, getAllScenes, loadScene, removeScene} from "react-pannellum";

import { getHouse, addFavoriteHouse, removeFavoriteHouse } from '../../util/APIUtils';
import './ViewHouse.css';


import { Form,
        Input, Button, Icon, notification } from 'antd';
import {MapView} from "../../components/map/MapView";


const FormItem = Form.Item;
const { TextArea } = Input


class ViewHouse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRoomIndex: -1,

            house: {
                name: {
                    text: ''
                },
                description: {
                    text: ''
                },
                price: 0,
                rooms: [],
                liked: false,
                location: {}
            }
        };

        this.nextRoom = this.nextRoom.bind(this);
        this.prevRoom = this.prevRoom.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);


    }

    componentDidMount() {
        getHouse(this.props.match.params.id)
            .then((response) => {
                let promises = [];
                response.rooms.forEach((room, index) => {
                    let promise = new Promise((resolve,reject) => {
                        addScene(`room-${index}`, {
                                imageSource: `data:image/jpeg;base64,${room.imageData}`
                            },
                            () => resolve()
                        );
                    });

                    promises.push(promise);
                })

                Promise.all(promises).then(() => {
                    removeScene("default-scene");

                    this.setState({
                        currentRoomIndex: response.rooms.length > 0 ? 0 : -1,
                        house: {
                            id: response.id,
                            name: {
                                text: response.name,
                            },
                            description: {
                                text: response.description,
                            },
                            price: response.price,
                            roomsLength: response.rooms.length,
                            liked: response.liked,
                            location: response.location,
                        }
                    })

                    loadScene(`room-0`);
                })


            });
    }

    async nextRoom() {
        const newRoomIndex = (this.state.currentRoomIndex + 1 < this.state.house.roomsLength) ? this.state.currentRoomIndex + 1 : 0;
        await this.setState({
            currentRoomIndex: newRoomIndex
        });

        loadScene(`room-${this.state.currentRoomIndex}`)

    }

    async prevRoom() {
        const newRoomIndex = (this.state.currentRoomIndex - 1 >= 0) ? this.state.currentRoomIndex - 1 : this.state.house.roomsLength -1 ;
        await this.setState({
            currentRoomIndex: newRoomIndex
        });

        loadScene(`room-${this.state.currentRoomIndex}`)

    }


    async like(id) {
        console.log("like " + id, this.state.house.liked);
        addFavoriteHouse(id).then(response => {
            this.setState({
                house: {...this.state.house, liked: true}
            })
        });
    }

    async unlike(id) {
        console.log("unlike " + id, this.state.house.liked);
        removeFavoriteHouse(id).then(response => {
            this.setState({
                house: {...this.state.house, liked: false}
            })
        });;
    }



    render() {
        const config = {
            autoRotate: -2
        };

        console.log("house",this.state.house)

        return (
            <div>
                <div className="parallax-section parallax1">
                    <div className="grid grid-pad">
                        <div className="col-1-1">

                            <ReactPannellum
                                id="panellum"
                                sceneId={`scene-default`}
                                config={config}
                                autoLoad={false}
                                style={{width:'100%', height: '700px'}}
                            >
                            </ReactPannellum>

                            <button onClick={this.nextRoom}
                                    className={'favorite-button'}
                                    style={{
                                            position: 'absolute',
                                            right: '0',
                                            top: '300px',
                                            backgroundColor: 'white',
                                            height: '100px',
                                            width: '50px'}}
                            >
                                {'>'}
                            </button>

                            <button onClick={this.prevRoom}
                                    className={'favorite-button'}
                                    style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '300px',
                                        backgroundColor: 'white',
                                        height: '100px',
                                        width: '50px'}}
                            >
                                {'<'}
                            </button>

                        </div>
                    </div>
                </div>

                <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
                </svg>


                <div className="new-poll-container">
                <h1 className="page-title">{this.state.house.name.text}</h1>
                <div className="new-poll-content">

                    <h4>{this.state.house.description.text}></h4>
                    {/*<div>Pret: {this.state.house.price}</div>*/}

                    <div style={{
                        position:'absolute',
                        right:100,
                        top: 700,
                        zIndex: 10}}>
                        {!this.state.house.liked ?
                            <button className={'favorite-button'} onClick={() => this.like(this.state.house.id)}>
                                🖤️
                            </button>
                        :
                            <button className={'favorite-button'} onClick={() => this.unlike(this.state.house.id)}>
                                ❤️
                            </button>
                        }
                    </div>
                </div>

            </div>

            <svg className="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
                 viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
            </svg>

            <div className="parallax-section parallax1">
                <div className="grid grid-pad">
                    <div className="col-1-1">
                        {
                            <MapView height={600}
                                     defaultCenter={[46.7833643, 23.5464727]}
                                     defaultZoom={12}
                                     onClick={this.onHouseClick}
                                     locations={[this.state.house.location]}
                            />
                        }

                    </div>
                </div>
            </div>

            <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%"
                 height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
            </svg>
            </div>
        );
    }
}




export default ViewHouse;