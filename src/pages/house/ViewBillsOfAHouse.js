import React, { Component } from 'react';
import ReactPannellum, {addScene, getAllScenes, loadScene, removeScene} from "react-pannellum";

import {getHouse, addFavoriteHouse, removeFavoriteHouse, getAllBillsOfAHouse} from '../../util/APIUtils';
import './ViewHouse.css';


import { Form,
    Input, Button, Icon, notification } from 'antd';
import {MapView} from "../../components/map/MapView";
import IndexForm from "../../components/IndexForm";


const FormItem = Form.Item;
const { TextArea } = Input


class ViewBillsOfAHouse extends Component {

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
                location: {},
                bills:[],
            },
            bill: {
                sum: 0.0,
                houseId: 0,
                issuedBy:'',
                issueDate: '',
                deadline: '',

            }
        };




    }

    componentDidMount() {
        getHouse(this.props.match.params.id)
            .then((response) => {
                console.log("HOUSEEE:",response);
                //let promises = [];
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



                    this.setState({
                        //currentRoomIndex: response.rooms.length > 0 ? 0 : -1,
                        house: {
                            id: response.id,
                            name: {
                                text: response.name,
                            },
                            description: {
                                text: response.description,
                            },
                            // price: response.price,
                            // roomsLength: response.rooms.length,
                            // liked: response.liked,
                            location: response.location,
                            bills: response.bills
                        }
                    })





            });
        // getAllBillsOfAHouse(this.props.match.params.id)
        //     .then((response) => {
        //         console.log("BILLS OF THIS HOUSE:",response);
        //         this.setState({
        //             house:{
        //                 bills: response,
        //             }
        //         });
        //     });
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





                        </div>
                    </div>
                </div>



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

                {/*<svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%"*/}
                {/*     height="100" viewBox="0 0 100 100" preserveAspectRatio="none">*/}
                {/*    <path d="M0 100 C 20 0 50 0 100 100 Z"></path>*/}
                {/*</svg>*/}
                <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
                </svg>


                <div className="new-poll-container" style={{display:'flex', justifyContent:'center', flexFlow:'row'}}>
                    <h1 className="page-title">Facturi curente: </h1>
                    <h1 className="page-title"><a>{this.state.house.name.text}</a></h1>

                    {/*<div className="new-poll-content">*/}

                    {/*    <h4>Facturi curente:</h4>*/}
                    {/*    /!*<div>Pret: {this.state.house.price}</div>*!/*/}


                    {/*</div>*/}

                </div>

                {/*<svg className="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"*/}
                {/*     viewBox="0 0 100 100" preserveAspectRatio="none">*/}
                {/*    <path d="M0 0 C 50 100 80 100 100 0 Z"></path>*/}
                {/*</svg>*/}
                <div>
                    {
                        !this.state.isLoading && this.state.house.bills.length === 0 ? (
                            <div className="no-polls-found">
                                <span>Nu aveti facturi pentru acest imobil,momentan!</span>
                            </div>
                        ): null
                    }
                    {
                       this.state.house.bills && this.state.house.bills.map((current, currentIndex) => {
                            return <div className="col-1-2" key={this.state.house.id} style={{display:'flex', justifyContent:'center',flexFlow:'column',border:5, borderColor:'#000000'}}>
                                   <br></br>
                                   <article className="post-wrap">
                                       <div className="post">
                                           <h4 className="entry-title">Emitent: {current.providerService.provider.name}</h4>
                                           <h4 className="entry-title">Tip factura: {current.providerService.serviceType.type}</h4>
                                           <h4 className="entry-title">Data emiterii: {current.issueDate}</h4>
                                           <h4 className="entry-title">Deadline: {current.deadline}</h4>
                                           <h4 className="entry-title">Suma: {current.sum}</h4>
                                           {
                                               current.status.status == "EXPECTING_INPUT"
                                                   //Paseaza atribute precum bill
                                                   ? <IndexForm billId={current.id} handleSucces={(newBill)=> {


                                                         const newBills =  this.state.house.bills.splice(currentIndex, 1, newBill);
                                                         this.setState({
                                                               house:{
                                                                   bills: newBills,
                                                               }
                                                         });

                                                   }}/>
                                                   : <Button className="btn read-more"
                                                             onClick={() => this.onOpen(this.props.location.id)}
                                                             style={{backgroundColor: "green", color: "white"}}

                                                   >
                                                       Plateste factura
                                                    </Button>


                                           }


                                       </div>
                                   </article>
                                   <br></br>
                                   <br></br>
                                   </div>
                       })
                    }
                </div>
            </div>
        );
    }
}




export default ViewBillsOfAHouse;