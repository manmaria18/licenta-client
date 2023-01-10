import React, { Component } from 'react';
import {searchHouse} from '../../util/APIUtils';
import './SearchHouse.css';

import {MapView} from "../../components/map/MapView";
import {HouseView} from "../../components/house/HouseView"
import LoadingIndicator from "../../common/LoadingIndicator"

import { Form,
        Input, Button, Icon, notification } from 'antd';


const FormItem = Form.Item;
const { TextArea } = Input


class SearchHouse extends Component {

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
        this.searchLocation = this.searchLocation.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.onHouseClick = this.onHouseClick.bind(this);
    }

    searchLocation(text) {

        let promise = searchHouse(text);

        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {

                console.log(response);
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
        this.searchLocation(this.props.match.params.name);
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

        return (
            <div>
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
                        <h1>Rezultatele cautarii:</h1>
                        <div style={{marginBottom: '150px'}}/>

                    </section>
                </div>


                {
                    !this.state.isLoading && this.state.locations.length === 0 ? (
                        <div className="no-polls-found">
                            <span>Nu sunt case de afisat.</span>
                        </div>
                    ): null
                }
                {
                    !this.state.isLoading && this.state.locations.length > 0 ? (
                        this.state.locations.map(location =>
                            <HouseView
                                location={location}
                                history={this.props.history}
                            />

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




export default SearchHouse;

