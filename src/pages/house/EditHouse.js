import React, { Component } from 'react';
import {editHouse, getHouse} from '../../util/APIUtils';
import {
    HOUSE_DESCRIPTION_MAX_LENGTH,
    HOUSE_NAME_MAX_LENGTH,
    HOUSE_MAX_ROOMS,
} from '../../constants';
import './EditHouse.css';

import {validateName,
    validateRoomImageFiles,
    validateDescription,
    validateLocation} from '../../util/validator/HouseValidator'

import {MapView} from '../../components/map/MapView'
import {RoomUpload} from '../../components/house/RoomUpload'

import { Form,
        Input, Button, Icon, notification } from 'antd';


const FormItem = Form.Item;
const { TextArea } = Input


class EditHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
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
        this.base64ToFileSize = this.base64ToFileSize.bind(this);

        getHouse(this.props.match.params.id)
            .then((response) => {
                console.log(response);

                let rooms = response.rooms.map((room, index) => {

                    let base64Room = "data:image/jpeg;base64," + room.imageData;

                    //let originalRoomFile = new File([room.imageData], "img.jpg",{type:"image/jpeg", lastModified:new Date().getTime()});
                    let originalRoomFile = new File([this.base64ToBlob(room.imageData)], "img.jpg",{type:"image/jpeg", lastModified:new Date().getTime()});


                    let roomFile = {
                        ...originalRoomFile,
                        originFileObj:  originalRoomFile,
                        percent: 100,
                        thumbUrl: base64Room,
                        uid: index,
                    }

                    return {
                        errorMsg: null,
                        imageFiles: [roomFile],
                        validateStatus: "success"} })

                console.log("FIle", rooms);

                this.setState({
                    id: response.id,
                    name: {
                        text: response.name,
                    },
                    description: {
                        text: response.description,
                    },
                    price: response.price,
                    rooms: rooms,
                    location: {
                        coordinates: response.location,
                    }


                })
            });


        this.base64ToBlob = this.base64ToBlob.bind(this);
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

    base64ToBlob(base64String) {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: "image/jpeg"});

        return blob;
    }

    base64ToFileSize(base64String) {
        return base64String * 6 / 8;
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
        const rooms = this.state.rooms;
        if(roomNumber >= rooms.length) return;
        // rooms[roomNumber].imageFiles = [];
        rooms[roomNumber] = {}
        this.setState({
            rooms: rooms,
        });

    }

    handleSubmit(event) {
        event.preventDefault();

        const home = {
            id: this.state.id,
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

        const images = this.state.rooms.reduce((prev, current) =>
            prev.concat(current.imageFiles)
        , []);

        images.forEach(image => {
            console.log("UPLOADINGGG", image.originFileObj)
            formData.append("images", image.originFileObj);
        });


        editHouse(formData)
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

    validateDescription = (descriptionText) => {
        if(descriptionText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your description!'
            }
        } else if (descriptionText.length > HOUSE_DESCRIPTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Description is too long (Maximum ${HOUSE_DESCRIPTION_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validateName = (nameText) => {
        if(nameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your house name!'
            }
        } else if (nameText.length > HOUSE_NAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too long (Maximum ${HOUSE_NAME_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validateLocation = (location) => {
        if(location == null) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please select a location for your house!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
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


    validateRoomImageFiles = (roomImageFiles) => {
        if (roomImageFiles == undefined || roomImageFiles == null)
        {
            return {
                validateStatus: 'error',
                errorMsg: 'Please select your room image!'
            }
        }

        if(roomImageFiles.length < 1) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please select your room image!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }


    handleRoomImageChange = (imageFiles, index) => {
        const rooms = this.state.rooms.slice();
        rooms[index] = {
            imageFiles: imageFiles,
            ...rooms[index],
            ...validateRoomImageFiles(imageFiles)
        }
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

        if(this.state.description.validateStatus !== 'success') {
            return true;
        }

        for(let i = 0; i < this.state.rooms.length; i++) {
            const room = this.state.rooms[i];
            if(room.validateStatus !== 'success') {
                return true;
            }
        }

        if(this.state.location.coordinates == null)
        {
            return true;
        }
    }


    render() {
        const roomViews = [];
        this.state.rooms.forEach((room, index) => {
            console.log("will push rrom", room)
            roomViews.push(<RoomUpload key={index}
                                 room={room}
                                 roomNumber={index}
                                 removeRoom={this.removeRoom}
                                 onChangeImage={this.handleRoomImageChange}
                                 onRemoveImage={this.removeRoomImage}
                            />);
        });

        const locations = this.state.location.coordinates ? [this.state.location.coordinates] : []

        return (
            <div className="new-poll-container">
                <h1 className="page-title">Editeaza Locuinta:</h1>
                <div className="new-poll-content">

                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                        <FormItem validateStatus={this.state.location.validateStatus}
                                  help={this.state.location.errorMsg} className="poll-form-row">
                            <MapView onMapClick={this.handleLocationChange}
                                     locations={locations}
                                     height={300}
                                     defaultZoom={12}
                            />
                        </FormItem>
                        <FormItem validateStatus={this.state.name.validateStatus}
                                  help={this.state.name.errorMsg} className="poll-form-row">
                            <Input
                                placeholder="Enter your house name"
                                style = {{ fontSize: '16px' }}
                                name = "name"
                                value = {this.state.name.text}
                                onChange = {this.handleNameChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.description.validateStatus}
                                  help={this.state.description.errorMsg} className="poll-form-row">
                            <TextArea
                                placeholder="Enter your house description"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 3, maxRows: 6 }}
                                name = "description"
                                value = {this.state.description.text}
                                onChange = {this.handleDescriptionChange} />
                        </FormItem>
                        {roomViews}
                        <FormItem className="poll-form-row">
                            <Button type="dashed" onClick={this.addRoom} disabled={this.state.rooms.length === HOUSE_MAX_ROOMS}>
                                <Icon type="plus" /> Adauga o camera
                            </Button>
                        </FormItem>

                        <FormItem className="poll-form-row">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    className="create-poll-form-button">Salveaza modificarile</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}



export default EditHouse;