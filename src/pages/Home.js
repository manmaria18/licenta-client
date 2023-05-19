import React, { Component } from 'react';
import { getAllHomes,} from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { withRouter } from 'react-router-dom';
import './Home.css';


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

        return (<div>
                <div className="parallax-section parallax1">
                    <div className="grid grid-pad">
                        <div className="col-1-1">

                        <MapView height={600}
                             defaultCenter={[46.7833643, 23.5464727]}
                             defaultZoom={12}
                             onClick={this.onHouseClick}
                             locations={this.state.locations.map(location =>{ return {...location.location, id: location.id} })}
                        />

                        </div>
                    </div>
                </div>

                <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
                </svg>


                <div className="wrap services-wrap" id="services">
                    <section className="grid grid-pad services">
                        <h2 style={{color:"#5aa6d1", fontFamily:"Copperplate Gothic Light",backgroundColor:"#001c55"}}>Rule over your own house!</h2>
                        <div style={{marginBottom: '150px'}}/>
                        <div className="col-1-4 service-box service-1" >
                            <div className="content">
                                <div className="service-icon">
                                    <b className="circle-icon icon-heart4">🏠</b>
                                </div>
                                <div className="service-entry">
                                    <h2>Vizualizati furnizori</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-1-4 service-box service-3">
                            <div className="content">
                                <div className="service-icon">
                                    <b className="circle-icon icon-display">🌐</b>
                                </div>
                                <div className="service-entry">
                                    <h2>Efectuati plati online usor si simplu!</h2>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>

                <svg className="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
                     viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
                </svg>


                <div className="parallax-section parallax2">
                    <div className="wrap">
                        <section className="grid grid-pad callout">
                            <div className="col-1-3">
                                <div className="content">
                                    <div className="info-counter">
                                        {/*<div className="info-counter-row">*/}
                                        {/*    <b className="info-counter-icon">🏠</b>*/}
                                        {/*</div>*/}
                                        <br/>
                                        <div className="info-counter-content">
                                            <h1 className="info-counter-number" style={{color: "white"}}>
                                                {this.state.locations.length}
                                            </h1>
                                            <h2 className="info-counter-text">Casele mele:</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>


                <svg className="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%"
                     height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
                </svg>

                <br/>
                <br/>
                <br/>


                {
                    !this.state.isLoading && this.state.locations.length === 0 ? (
                        <div className="no-polls-found">
                            <span>Nu sunt case de afisat.</span>
                        </div>    
                    ): null
                }  
                {
                    !this.state.isLoading && this.state.locations.length > 0 ? (
                        this.state.locations.map(location => <div>
                                <HouseView
                                    location={location}
                                    history={this.props.history}
                                />
                            <br/>
                            <br/>
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

export default withRouter(Home);