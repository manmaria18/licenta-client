import React, { Component } from 'react';
import {editHouse, getAllHomes, getAllServices, getHouse} from '../../util/APIUtils';
import {
    HOUSE_MAX_ROOMS,
} from '../../constants';
import './NewHouse.css';

import {MapView} from '../../components/map/MapView'
import {ServiceUpload} from '../../components/house/ServiceUpload'
import {validateName,
    validateRoomImageFiles,
    validateDescription,
    validateLocation} from '../../util/validator/HouseValidator'


import { Form,
        Input, Button, Icon, notification } from 'antd';


const FormItem = Form.Item;
const { TextArea } = Input


class UpdateHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: {
                text: ''
            },
            services: [
                {
                    id: 0,
                    serviceType: {
                        id: '',
                        type: ''
                    },
                    price: 0.0,
                    provider: {
                        id: 0,
                        name: ''
                    }
                },
            ],
            location: null,
            service: {
                id: 0,
                serviceType: {
                    id: '',
                    type: ''
                },
                price: 0.0,
                provider: {
                    id: 0,
                    name: ''
                }
            },
            selectedServices:[],


        };

        getHouse(this.props.match.params.id)
            .then((response) => {
                console.log("RESPONSE",response);
                this.setState({
                    id: response.id,
                    name: {
                        text: response.name,
                    },
                    location: response.location,
                    services: [],
                    selectedServices: response.services ? response.services.map(service => service.id) : [],
                });
            });

        this.addService = this.addService.bind(this);
        this.removeRoom = this.removeRoom.bind(this);
        this.removeRoomImage = this.removeRoomImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleNameChange = this.handleNameChange.bind(this);
        //this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

        //this.handleRoomImageChange = this.handleRoomImageChange.bind(this);
        //this.handleRoomAudioChange = this.handleRoomAudioChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.loadAllServices = this.loadAllServices.bind(this);
        this.selectService = this.selectService.bind(this);
        this.unselectService = this.unselectService.bind(this);
        this.isServiceSelected = this.isServiceSelected.bind(this);
    }

    componentDidMount() {
        this.loadAllServices();
    }

    addService(event) {
        const services = this.state.services.slice();
        this.setState({
            services: services.concat([
                { }
            ])
        });
    }


    selectService(id){
        //Cautam serviciul selectat pe baza id-ului
        let my_service = this.state.services.filter(service => service.id==id)[0];
        //Trecem prin toate id-urile erviciilor selectate
        let selectedServices = this.state.selectedServices.filter(selectedId => {
            //pe baza id-ului luam serviciul
            let a_service = this.state.services.filter(service => service.id==selectedId)[0]
            //acceptam serviciul doar daca este de alt tip decat serviciul selectat
            return a_service.serviceType.id != my_service.serviceType.id
        });
        selectedServices = [...selectedServices,id];
        console.log("SERVICES",selectedServices);
        this.setState({
            selectedServices: selectedServices
        })
    }

    unselectService(id){
        let selectedServices = this.state.selectedServices
        const index = selectedServices.indexOf(id);
        if (index > -1) { // only splice array when item is found
            selectedServices.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.setState({
            selectedServices: selectedServices
        })
    }

    isServiceSelected(id){
        return this.state.selectedServices.includes(id);
    }

    loadAllServices() {

        let promise = getAllServices();

        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {

                console.log("AICI",response);
                this.setState({
                    services: response,
                    isLoading: false
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
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
            id: this.state.id,
            name: this.state.name.text,
            //description: this.state.description.text,
            location: this.state.location,
            services: this.state.selectedServices.map(selectedId=> {
                return {
                    id: selectedId,
                }
            })
        };

        // const formData = new FormData();
        //
        // formData.append("home",
        //     new Blob(
        //         [JSON.stringify(home)],
        //         {
        //             type: "application/json"
        //         })
        // );

        //console.log("Rooomssss", this.state.rooms);

        // const images = this.state.rooms.reduce((prev, current) =>
        //     prev.concat(current.imageFiles)
        // , []);
        //
        // images.forEach(image => {
        //     formData.append("images", image.originFileObj);
        // });


        editHouse(home)
            .then(response => {
                this.props.history.push("/");
            }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create a house!.');
            } else {
                notification.error({
                    message: 'Emperia',
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
            location: coordinates,
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

        if(this.state.location == null)
        {
            return true;
        }
    }


    render() {
        const services = [];
        const serviceProviders = new Map()
        this.state.services.forEach((service, index) => {

            if (!serviceProviders.has(service.serviceType.type)){
                serviceProviders.set(service.serviceType.type,[])
            }

            serviceProviders.get(service.serviceType.type).push(service);


        });
        console.log("Service Providers", serviceProviders);
        for (const [key, value] of serviceProviders) { // Using the default iterator (could be `map.entries()` instead)
            console.log("LOOK HEREE");
            console.log(key,value);
            services.push(
                <div  style = {{ fontSize: '30px', width:'50%',  marginLeft: 'auto', marginRight: 'auto', display: 'flex',flexDirection:'column', textAlign:'center' }}>
                    <div style={{display:'flex',justifyContent:'center', backgroundColor:"#5aa6d1"}}>
                        {key}
                    </div>
                    {
                        value.map(serviceProvider=>(
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    {
                                        this.isServiceSelected(serviceProvider.id)
                                            ?  <Button onClick={()=> this.unselectService(serviceProvider.id)}>
                                                REMOVE {serviceProvider.provider.name}---{serviceProvider.price}
                                            </Button>
                                            :  <Button onClick={()=> this.selectService(serviceProvider.id)}>
                                                ADD {serviceProvider.provider.name}---{serviceProvider.price}
                                            </Button>
                                    }


                                </div>
                            )

                        )
                    }

                </div>);
        }

        // this.state.services.forEach((service, index) => {
        //     services.push(
        //         <div  style = {{ fontSize: '30px', width:'50%',  marginLeft: 'auto', marginRight: 'auto', display: 'flex',flexDirection:'column', textAlign:'center' }}>
        //           <div style={{display:'flex',justifyContent:'center', backgroundColor:"#5aa6d1"}}>
        //               {service.serviceType.type}
        //           </div>
        //             <div style={{display:'flex',justifyContent:'center', backgroundColor:"blue"}}>
        //                 {service.serviceType.type}
        //             </div>
        //         </div>);
        // });


        const locations = this.state.location ? [this.state.location] : []

        return (
            <div>

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                                  className="poll-form-row">

                            <div className="wrap" style={{height:"150px"}}>
                                <section className="grid grid-pad services">
                                    <h1>Modifica locuinta!</h1>
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

                        <div className="wrap" style={{height:"150px"}}>
                            <section className="grid grid-pad services">
                                <h1>3. Servicii:</h1>
                            </section>
                        </div>


                        <div  style = {{ fontSize: '30px', width:'50%',  marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign:'center' }}>
                            {services}
                        </div>


                        <FormItem className="poll-form-row">
                            <div  style = {{ fontSize: '30px', width:'50%', height: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign:'center' }}>
                            <Button type="dashed" onClick={this.addRoom}>
                                <Icon type="plus" /> Adauga un serviciu
                            </Button>
                            </div>
                        </FormItem>

                        <FormItem className="poll-form-row">
                            <Button type="primary"
                                    style = {{ fontSize: '30px', width:'50%', height: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block', textAlign:'center' }}
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    className="create-poll-form-button">Modifica</Button>
                        </FormItem>
                    </Form>
            </div>
        );
    }
}

export default UpdateHouse;