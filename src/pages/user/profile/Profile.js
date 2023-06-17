import React, { Component } from 'react';
import {getUserProfile, getAllUserHouses, getFavoriteHouses, getUserBills} from '../../../util/APIUtils';
import { Tabs } from 'antd';
import LoadingIndicator from '../../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../../common/NotFound';
import ServerError from '../../../common/ServerError';
import { MapView } from "../../../components/map/MapView";
import HousesList from "../../../components/house/HouseList";
import UserBox from "../../../components/user/UserBox";
import CurveUpSvg from "../../../components/design/CurveUpSvg";
import BillList from "../../../components/bill/BillList";

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            locations: [],
            favorites: [],
            bills: [],
            isLoading: false
        };
        this.onHouseClick = this.onHouseClick.bind(this);
        this.loadUserLocations = this.loadUserLocations.bind(this);
        this.loadUserBills = this.loadUserBills.bind(this);
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
        this.loadUserLocations();
        this.loadUserBills();
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
            this.loadUserLocations();
        }
    }

    loadUserLocations() {
        let promise = getAllUserHouses();

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                console.log("delete setting")
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

    loadUserBills() {
        let promise = getUserBills();

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                console.log("bills", response)
                this.setState({
                    bills: response,
                    isLoading: false
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
            .then(response => {
                this.setState({
                    user: response,
                    isLoading: false
                });
            }).catch(error => {
            if (error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    onHouseClick(id) {
        this.props.history.push('/house/view/' + id);
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>;
        }

        if (this.state.notFound) {
            return <NotFound/>;
        }

        if (this.state.serverError) {
            return <ServerError/>;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        const {user, locations, bills} = this.state;

        return (
            <div className="profile">
                {user && (
                    <div className="user-profile">
                        <UserBox user={user} />
                        <div className="user-poll-details">
                            <Tabs
                                defaultActiveKey="1"
                                animated={false}
                                tabBarStyle={tabBarStyle}
                                size="large"
                                className="profile-tabs"
                            >
                                <TabPane tab={`${locations.length} Casele mele`} key="1">
                                    <div className="parallax-section parallax1">
                                        <div className="grid grid-pad">
                                            <div className="col-1-1">
                                                <MapView
                                                    height={600}
                                                    defaultCenter={[46.7833643, 23.5464727]}
                                                    defaultZoom={12}
                                                    onClick={this.onHouseClick}
                                                    locations={locations.map(location => ({
                                                        ...location.location,
                                                        id: location.id
                                                    }))}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <CurveUpSvg/>

                                    <HousesList
                                        onClick={this.onHouseClick}
                                        locations={locations.map(location => ({
                                            ...location.location,
                                            id: location.id
                                        }))}
                                        history={this.props.history}
                                    />
                                </TabPane>

                                <TabPane tab={`${bills.length} Facturile mele`} key="2">

                                    <CurveUpSvg />
                                    <div style={{marginBottom: '150px'}}/>
                                    <BillList bills={bills} />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Profile;