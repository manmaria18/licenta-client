import React, { Component } from 'react';
import { createHouse } from '../../util/APIUtils';
import {
    HOUSE_MAX_ROOMS,
} from '../../constants';
import './NewHouse.css';

import {MapView} from '../../components/map/MapView'
import {RoomUpload} from '../../components/house/RoomUpload'
import {validateName,
    validateRoomImageFiles,
    validateDescription,
    validateLocation} from '../../util/validator/HouseValidator'


import { Form,
        Input, Button, Icon, notification } from 'antd';


const FormItem = Form.Item;
const { TextArea } = Input


class NewHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            description: {
                text: ''
            },
            rooms: [
                {

                },
            ],
            location: {
                coordinates: null,
            }
        };
        this.addRoom = this.addRoom.bind(this);
        this.removeRoom = this.removeRoom.bind(this);
        this.removeRoomImage = this.removeRoomImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

        this.handleRoomImageChange = this.handleRoomImageChange.bind(this);
        this.handleRoomAudioChange = this.handleRoomAudioChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    addRoom(event) {
        const rooms = this.state.rooms.slice();
        this.setState({
            rooms: rooms.concat([
                { }
            ])
        });
    }

    removeRoom(roomNumber) {
        const rooms = this.state.rooms.slice();
        this.setState({
            rooms: [...rooms.slice(0, roomNumber), ...rooms.slice(roomNumber+1)]
        });
    }

    removeRoomImage(roomNumber) {
        console.log("THIS IS A ROOM", this.state.rooms)
        const rooms = this.state.rooms;
        if(roomNumber >= rooms.length) return;
        // rooms[roomNumber].imageFiles = [];
        rooms[roomNumber] = {}
        this.setState({
            rooms: rooms,
        });
        console.log("WILL REMOVE ROOM IMAGE", rooms);

    }

    handleSubmit(event) {
        event.preventDefault();

        const home = {
            name: this.state.name.text,
            description: this.state.description.text,
            location: this.state.location.coordinates,
        };

        const formData = new FormData();

        formData.append("home",
            new Blob(
                [JSON.stringify(home)],
                {
                    type: "application/json"
                })
        );

        console.log("Rooomssss", this.state.rooms);

        // const images = this.state.rooms.reduce((prev, current) =>
        //     prev.concat(current.imageFiles)
        // , []);
        //
        // images.forEach(image => {
        //     formData.append("images", image.originFileObj);
        // });


        createHouse(formData)
            .then(response => {
                this.props.history.push("/");
            }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create a house!.');
            } else {
                notification.error({
                    message: 'Imobiliare360',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }



    handleNameChange(event) {
        const value = event.target.value;
        this.setState({
            name: {
                text: value,
                ...validateName(value)
            }
        });
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({
            description: {
                text: value,
                ...validateDescription(value)
            }
        });
    }


    handleRoomImageChange = (imageFiles, index) => {
        const rooms = this.state.rooms.slice();

        console.log("!!!!!", rooms);

        rooms[index] = {
            imageFiles: imageFiles,
            ...rooms[index],
            ...validateRoomImageFiles(imageFiles)
        }
        console.log(rooms)
        this.setState({
            rooms: rooms
        });
    }

    handleRoomAudioChange = (audioFiles, index) => {
        const rooms = this.state.rooms.slice();
        rooms[index] = {
            audioFiles: audioFiles,
            ...rooms[index],
        }

        console.log(rooms);
        this.setState({
            rooms: rooms
        });
    }

    handleLocationChange(event) {

        console.log("location change")
        let coordinates = {
            latitude: event.latLng[0],
            longitude: event.latLng[1],
        };

        this.setState({
            location: {
                coordinates: coordinates,
            }
        })
    }

    isFormInvalid() {
        if(this.state.name.validateStatus !== 'success') {
            return true;
        }

        // if(this.state.description.validateStatus !== 'success') {
        //     return true;
        // }

        // for(let i = 0; i < this.state.rooms.length; i++) {
        //     const room = this.state.rooms[i];
        //     if(room.validateStatus !== 'success') {
        //         return true;
        //     }
        // }

        if(this.state.location.coordinates == null)
        {
            return true;
        }
    }


    render() {
        const roomViews = [];
        this.state.rooms.forEach((room, index) => {
            roomViews.push(
                <div  style = {{ fontSize: '30px', width:'50%',  marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign:'center' }}>
                    <RoomUpload key={index}
                                 room={room}
                                 roomNumber={index}
                                 removeRoom={this.removeRoom}
                                 onChangeImage={this.handleRoomImageChange}
                                 onRemoveImage={this.removeRoomImage}
            />
                </div>);
        });


        const locations = this.state.location.coordinates ? [this.state.location.coordinates] : []

        return (
            <div>

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem validateStatus={this.state.location.validateStatus}
                                  help={this.state.location.errorMsg} className="poll-form-row">

                            <div className="wrap" style={{height:"150px"}}>
                                <section className="grid grid-pad services">
                                    <h1>Adauga o noua locuinta!</h1>
                                </section>
                            </div>

                            <div className="wrap" style={{height:"150px"}}>
                                <section className="grid grid-pad services">
                                    <h1>1. Locatie:</h1>
                                </section>
                            </div>

                            <svg className="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
                                 viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
                            </svg>


                            <div className="parallax-section parallax1">
                                <div className="grid grid-pad">
                                    <div className="col-1-1">

                                        <MapView height={800}
                                                 defaultCenter={[46.7833643, 23.5464727]}
                                                 defaultZoom={12}
                                                 onMapClick={this.handleLocationChange}
                                                 locations={locations}
                                        />

                                    </div>
                                </div>
                            </div>
                        </FormItem>

                        <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
                        </svg>


                        <div className="wrap" style={{height:"150px"}}>
                            <section className="grid grid-pad services">
                                <h1>2. Denumire:</h1>
                            </section>
                        </div>

                        <FormItem validateStatus={this.state.name.validateStatus}
                                  help={this.state.name.errorMsg} className="poll-form-row">
                            <Input
                                placeholder="numele casei/numele firmei"
                                style = {{ fontSize: '30px', width:'50%', height: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign:'center' }}
                                name = "name"
                                value = {this.state.name.text}
                                onChange = {this.handleNameChange} />
                        </FormItem>

                        {/*<div className="wrap" style={{height:"150px"}}>*/}
                        {/*    <section className="grid grid-pad services">*/}
                        {/*        <h1>3. Descriere:</h1>*/}
                        {/*    </section>*/}
                        {/*</div>*/}


                        {/*<FormItem validateStatus={this.state.description.validateStatus}*/}
                        {/*          help={this.state.description.errorMsg} className="poll-form-row">*/}
                        {/*    <TextArea*/}
                        {/*        placeholder="Enter your house description"*/}
                        {/*        style = {{ fontSize: '30px', width:'50%', height: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign:'center' }}*/}
                        {/*        autosize={{ minRows: 3, maxRows: 6 }}*/}
                        {/*        name = "description"*/}
                        {/*        value = {this.state.description.text}*/}
                        {/*        onChange = {this.handleDescriptionChange} />*/}
                        {/*</FormItem>*/}

                        {/*<div className="wrap" style={{height:"150px"}}>*/}
                        {/*    <section className="grid grid-pad services">*/}
                        {/*        <h1>4. Camere:</h1>*/}
                        {/*    </section>*/}
                        {/*</div>*/}


                        {/*<div  style = {{ fontSize: '30px', width:'50%',  marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign:'center' }}>*/}
                        {/*    {roomViews}*/}
                        {/*</div>*/}


                        {/*<FormItem className="poll-form-row">*/}
                        {/*    <div  style = {{ fontSize: '30px', width:'50%', height: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign:'center' }}>*/}
                        {/*    <Button type="dashed" onClick={this.addRoom} disabled={this.state.rooms.length === HOUSE_MAX_ROOMS}>*/}
                        {/*        <Icon type="plus" /> Adauga o camera*/}
                        {/*    </Button>*/}
                        {/*    </div>*/}
                        {/*</FormItem>*/}

                        <FormItem className="poll-form-row">
                            <Button type="primary"
                                    style = {{ fontSize: '30px', width:'50%', height: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign:'center' }}
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    className="create-poll-form-button">Adauga</Button>
                        </FormItem>
                    </Form>
            </div>
        );
    }
}

export default NewHouse;