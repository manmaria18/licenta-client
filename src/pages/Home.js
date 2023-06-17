import React, { Component } from 'react';
import { getAllHomes,} from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { withRouter } from 'react-router-dom';
import './Home.css';
import { Carousel, Radio } from 'antd';
//import { useState } from 'react';



import {MapView} from '../components/map/MapView'
import HouseView from "../components/house/HouseView";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            polls: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            currentVotes: [],
            isLoading: false
        };
        this.loadAllLocations = this.loadAllLocations.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.onHouseClick = this.onHouseClick.bind(this);
    }

    loadAllLocations(page) {

        let promise = getAllHomes();

        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
        .then(response => {

            console.log("HOME RESPONSE",response);
            this.setState({
                locations: response,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }


    onHouseClick(id) {
        this.props.history.push('/house/view/' + id);
    }

    componentDidMount() {
        this.loadAllLocations();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                polls: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                currentVotes: [],
                isLoading: false
            });    
            this.loadAllLocations();
        }
    }

    handleLoadMore() {
        this.loadPollList(this.state.page + 1);
    }

    handleVoteChange(event, pollIndex) {
        const currentVotes = this.state.currentVotes.slice();
        currentVotes[pollIndex] = event.target.value;

        this.setState({
            currentVotes: currentVotes
        });
    }






    render() {

        //const [dotPosition, setDotPosition] = useState('top');
        // const onChange = (currentSlide) => {
        //     console.log(currentSlide);
        // };
        return (<div>
                <div className="parallax-section parallax1">
                    <div className="grid grid-pad">
                        <div className="col-1-1">

                        {/*<MapView height={600}*/}
                        {/*     defaultCenter={[46.7833643, 23.5464727]}*/}
                        {/*     defaultZoom={12}*/}
                        {/*     onClick={this.onHouseClick}*/}
                        {/*     //locations={this.state.locations.map(location =>{ return {...location.location, id: location.id} })}*/}
                        {/*/>*/}

                            <Carousel autoplay dotsPosition='bottom'>
                                <div>
                                    <h3 style={{height: '600px',
                                        color: '#fff',
                                        lineHeight: '160px',
                                        textAlign: 'center',
                                        fontFamily:"Copperplate Gothic Light",
                                        background: '#364d79'}}>Domneste peste imobilele tale!</h3>
                                </div>
                                <div>
                                    <h3 style={{height: '600px',
                                        color: '#fff',
                                        lineHeight: '160px',
                                        textAlign: 'center',
                                        fontFamily:"Copperplate Gothic Light",
                                        background: '#364d79'}}> <img src={"https://conocedores.com/wp-content/uploads/2016/06/googlemapslogo.jpg"} style={{height:"600px",width:"1550px"}}></img></h3>

                                </div>
                                <div>
                                    <h3 style={{height: '600px',
                                        color: '#fff',
                                        lineHeight: '160px',
                                        textAlign: 'center',
                                        fontFamily:"Copperplate Gothic Light",
                                        background: '#364d79'}}>
                                        <img src={"https://ithot.ro/wp-content/uploads/2020/01/Furnizori-Energie-Electrica-ithot-ro-11.jpg"} style={{height:"600px",width:"1550px"}}></img>

                                    </h3>
                                </div>
                                <div>
                                    <h3 style={{height: '600px',
                                        color: '#fff',
                                        lineHeight: '160px',
                                        textAlign: 'center',
                                        fontFamily:"Copperplate Gothic Light",
                                        background: '#364d79'}}>
                                        <img src={"https://canada-first.ca/wp-content/uploads/2019/12/Lowest-Credit-Card-Processing-Fees.jpg"} style={{height:"600px",width:"1550px"}}></img>

                                    </h3>
                                </div>
                                <div>
                                    <h3 style={{height: '600px',
                                        color: '#fff',
                                        lineHeight: '160px',
                                        textAlign: 'center',
                                        fontFamily:"Copperplate Gothic Light",
                                        background: '#364d79'}}>
                                        <img src={"https://image.freepik.com/free-vector/online-payment-background-design_23-2147692504.jpg"} style={{height:"600px",width:"1550px"}}></img>

                                    </h3>
                                </div>

                            </Carousel>
                            <div style={{backgroundColor: '#fffd20'}} className="custom-dots">
                                {/* Custom dots */}
                            </div>
                        </div>
                    </div>
                </div>

                {/*<svg style={{backgroundColor:"#001c55"}}className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">*/}
                {/*    <path d="M0 100 C 20 0 50 0 100 100 Z"></path>*/}
                {/*</svg>*/}


                {/*<div className="wrap services-wrap" id="services">*/}
                {/*    <section className="grid grid-pad services">*/}
                {/*        <h2 style={{color:"#5aa6d1", fontFamily:"Copperplate Gothic Light",backgroundColor:"#001c55"}}>Rule over your own house!</h2>*/}
                {/*        <div style={{marginBottom: '150px'}}/>*/}
                {/*        <div className="col-1-4 service-box service-1" >*/}
                {/*            <div className="content">*/}
                {/*                <div className="service-icon">*/}
                {/*                    <b className="circle-icon icon-heart4">🏠</b>*/}
                {/*                </div>*/}
                {/*                <div className="service-entry">*/}
                {/*                    <h2>Vizualizati furnizori</h2>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <div className="col-1-4 service-box service-3">*/}
                {/*            <div className="content">*/}
                {/*                <div className="service-icon">*/}
                {/*                    <b className="circle-icon icon-display">🌐</b>*/}
                {/*                </div>*/}
                {/*                <div className="service-entry">*/}
                {/*                    <h2>Efectuati plati online usor si simplu!</h2>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*    </section>*/}
                {/*</div>*/}

                {/*<svg className="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"*/}
                {/*     viewBox="0 0 100 100" preserveAspectRatio="none">*/}
                {/*    <path d="M0 0 C 50 100 80 100 100 0 Z"></path>*/}
                {/*</svg>*/}


                {/*<div className="parallax-section parallax2">*/}
                {/*    <div className="wrap">*/}
                {/*        <section className="grid grid-pad callout">*/}
                {/*            <div className="col-1-3">*/}
                {/*                <div className="content">*/}
                {/*                    <div className="info-counter">*/}
                {/*                        /!*<div className="info-counter-row">*!/*/}
                {/*                        /!*    <b className="info-counter-icon">🏠</b>*!/*/}
                {/*                        /!*</div>*!/*/}
                {/*                        <br/>*/}
                {/*                        <div className="info-counter-content">*/}
                {/*                            <h1 className="info-counter-number" style={{color: "white"}}>*/}
                {/*                                /!*{this.state.locations.length}*!/*/}
                {/*                            </h1>*/}
                {/*                            <h2 style={{color:"#5aa6d1", fontFamily:"Copperplate Gothic Light"}} className="info-counter-text">Domneste peste casa ta!</h2>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </section>*/}
                {/*    </div>*/}
                {/*</div>*/}




                {/*<svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%"*/}
                {/*     height="100" viewBox="0 0 100 100" preserveAspectRatio="none">*/}
                {/*    <path d="M0 100 C 20 0 50 0 100 100 Z"></path>*/}
                {/*</svg>*/}

                {/*<br/>*/}
                {/*<br/>*/}
                {/*<br/>*/}


                {/*{*/}
                {/*    !this.state.isLoading && this.state.locations.length === 0 ? (*/}
                {/*        <div className="no-polls-found">*/}
                {/*            <span>Nu sunt case de afisat.</span>*/}
                {/*        </div>    */}
                {/*    ): null*/}
                {/*}  */}
                {/*{*/}
                {/*    !this.state.isLoading && this.state.locations.length > 0 ? (*/}
                {/*        this.state.locations.map(location => <div>*/}
                {/*                <HouseView*/}
                {/*                    location={location}*/}
                {/*                />*/}
                {/*            <br/>*/}
                {/*            <br/>*/}
                {/*            </div>*/}

                {/*        )) : null*/}
                {/*}              */}
                {
                    this.state.isLoading ? 
                    <LoadingIndicator />: null                     
                }



            </div>
        );
    }
}

export default withRouter(Home);