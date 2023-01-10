import React, { Component } from 'react';
import {
    getUserProfile,
    getAllHomes,
    getAllUsers,
    getFavoriteHouses,
} from '../../util/APIUtils';
import {Avatar, Tabs} from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Admin.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import HouseView from '../../components/house/HouseView';
import {MapView} from "../../components/map/MapView";

const TabPane = Tabs.TabPane;


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            locations: [],
            favorites: [],
            users: [],
            isLoading: false
        }
        this.loadAllUsers = this.loadAllUsers.bind(this);
        this.onHouseClick = this.onHouseClick.bind(this);
        this.loadAllHomes = this.loadAllHomes.bind(this);
        this.deleteSuccessCallback = this.deleteSuccessCallback.bind(this);
        this.deleteFailCallback = this.deleteFailCallback.bind(this);
        this.loadUserProfile = this.loadUserProfile.bind(this);

    }

    loadAllUsers() {

        let promise = getAllUsers();

        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                console.log("USERSSS", response);
                this.setState({
                    users: response,
                    isLoading: false
                })
            }).catch(error => {
            console.log("USERSSS FAIL ", error);
            this.setState({
                isLoading: false
            })
        });

    }

    loadAllHomes() {

        let promise = getAllHomes();

        if(!promise) {
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


    onHouseClick(id) {
        this.props.history.push('/house/view/' + id);
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
            if(error.status === 404) {
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

    deleteSuccessCallback(houseId) {
        console.log("delete success callback");
        this.setState({
            isLoading: true
        });

        this.loadAllHomes();

    }

    deleteFailCallback(houseId, error) {
        if(error.status === 404) {
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
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
        this.loadAllHomes();
        this.loadAllUsers()
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
            this.loadAllHomes();
            this.loadAllUsers();
        }        
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };


        console.log("Favss", this.state.favorites)
        return (
            <div className="profile">
                { 
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name)}}>
                                        {this.state.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.name}</div>
                                    <div className="username">@{this.state.user.username}</div>
                                    <div className="user-joined">
                                        Membru din {formatDate(this.state.user.joinedAt)}
                                    </div>
                                </div>
                            </div>
                            <div className="user-poll-details">    
                                <Tabs defaultActiveKey="1" 
                                    animated={false}
                                    tabBarStyle={tabBarStyle}
                                    size="large"
                                    className="profile-tabs">
                                    <TabPane tab={`${this.state.locations.length} Anunturi`} key="1">

                                        <MapView height={300}
                                                 defaultCenter={[46.7833643, 23.5464727]}
                                                 defaultZoom={12}
                                                 onClick={this.onHouseClick}
                                                 locations={this.state.locations.map(location => {return {...location.location, id: location.id }})}
                                        />

                                        <div>
                                            {this.state.locations.map(location =>
                                                <HouseView
                                                    location={location}
                                                    history={this.props.history}
                                                    currentUser={this.props.currentUser}
                                                    onDeleteSuccessCallback={this.deleteSuccessCallback}
                                                    onDeleteFailCallback={this.deleteFailCallback}
                                                />

                                            )}
                                        </div>
                                    </TabPane>
                                    <TabPane tab={`${this.state.favorites.length} Favorite`}  key="2">
                                        <MapView height={300}
                                                 defaultCenter={[46.7833643, 23.5464727]}
                                                 defaultZoom={12}
                                                 onClick={this.onHouseClick}
                                                 locations={this.state.favorites.map(favorite => {return {...favorite.location, id: favorite.id }})}
                                        />
                                        {this.state.favorites.map(favorite =>
                                            <HouseView
                                                location={favorite}
                                                history={this.props.history}
                                            />

                                        )}
                                    </TabPane>
                                </Tabs>
                            </div>  
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}



export default Profile;