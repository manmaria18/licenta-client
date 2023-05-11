import {Form, Icon} from "antd";
import {FileTypes, FileUpload} from "../files/FileUpload";
import React, { Component } from 'react';
import {getAllServices} from "../../util/APIUtils";
import {loadScene, removeScene} from "react-pannellum";
import HouseView from "./HouseView";
import LoadingIndicator from "../../common/LoadingIndicator";

const FormItem = Form.Item;

export class ServiceUpload extends Component {

    // _onChangeImage = (imageFileList) => {
    //     this.props.onChangeImage(imageFileList, this.props.roomNumber);
    // }
    //
    // _onRemoveImage = () => {
    //     this.props.onRemoveImage(this.props.roomNumber);
    // }

    constructor(props) {
        super(props);
        this.state = {
            currentServiceIndex: -1,
            services:[],
            service: {
                id: 0,
                serviceType:{
                    id: '',
                    type: ''
                },
                price:0.0,
                provider:{
                    id:0,
                    name: ''
                }
            }
        };




    }

    componentDidMount() {
        getAllServices()
            .then((response) => {
                let promises = [];
                // response.rooms.forEach((room, index) => {
                //     let promise = new Promise((resolve,reject) => {
                //         addScene(`room-${index}`, {
                //                 imageSource: `data:image/jpeg;base64,${room.imageData}`
                //             },
                //             () => resolve()
                //         );
                //     });
                //
                //     promises.push(promise);
                // })

                Promise.all(promises).then(() => {
                    removeScene("default-scene");

                    this.setState({
                        currentServiceIndex: response.services.length > 0 ? 0 : -1,
                        // service: {
                        //     id: response.id,
                        //     serviceType: {
                        //        id: response.serviceType.id,
                        //        type:response.serviceType.type,
                        //     },
                        //     price: response.price,
                        //     provider: {
                        //         id: response.provider.id,
                        //         name: response.provider.name
                        //     }
                        // },
                        services: response.services
                    })

                    loadScene(`room-0`);
                })


            });
    }


    render() {

        return (
           <div>
               {
                   !this.state.isLoading && this.state.services.length === 0 ? (
                       <div className="no-polls-found">
                           <span>Nu exista servicii disponibile.</span>
                       </div>
                   ): null
               }
               {
                   !this.state.isLoading && this.state.services.length > 0 ? (
                       this.state.services.map(service => <div>
                               <p>Tip serviciu: {service.serviceType}</p>

                               <br/>
                               <br/>
                                <botton className="btn read-more" style={{backgroundColor: "green", color: "white"}}> Adauga serviciu </botton>
                           </div>

                       )) : null
               }
               {
                   this.state.isLoading ?
                       <LoadingIndicator />: null
               }
           </div>
        );
    }
}