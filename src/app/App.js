import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import Home from '../pages/Home';
import TestTheme from '../pages/TestTheme';
import NewHouse from '../pages/house/NewHouse';
import ViewHouse from '../pages/house/ViewHouse';
import EditHouse from '../pages/house/EditHouse';
import SearchHouse from '../pages/house/SearchHouse';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

import { Layout, notification } from 'antd';
import Admin from "../user/admin/Admin";
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: true,
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="La revedere!.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Imobiliare 360',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Imobiliare 360',
      description: "V-ati logat cu succes.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }

    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout}
            style={{backgroundColor: '#2C2D31'}}
          />

          <Content className="app-content">
            <div className="container">
              <Switch>
                <Route exact path="/experiment"
                       render={(props) => <TestTheme isAuthenticated={this.state.isAuthenticated}
                                                currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>

                <Route exact path="/" 
                  render={(props) => <Home isAuthenticated={this.state.isAuthenticated}
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>

                <Route path="/login"
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>

                <Route path="/users/:username"
                       render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>

                <Route path="/admin/:username"
                       render={(props) => <Admin isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>

                <PrivateRoute authenticated={this.state.isAuthenticated}
                              path="/house/new" component={NewHouse}
                              handleLogout={this.handleLogout}></PrivateRoute>

                <PrivateRoute authenticated={this.state.isAuthenticated}
                              path="/house/edit/:id" component={EditHouse}
                              handleLogout={this.handleLogout}
                              currentUser={this.state.currentUser}></PrivateRoute>

                <Route path="/house/view/:id"
                       component={ViewHouse}
                       currentUser={this.state.currentUser}></Route>

                <Route path="/house/search/:name"
                       component={SearchHouse}
                       currentUser={this.state.currentUser}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </div>


            <svg className="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
                 viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
            </svg>

            <footer className="wrap">
              <div className="social-footer">
                <div className="grid grid-pad">
                  <div className="col-1-1">
                    <div className="content">
                      <div style={{marginBottom: '50px'}}/>
                      <p className="source-org copyright">© 2022 | Ana Tivadar</p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </Content>


        </Layout>
    );
  }
}

export default withRouter(App);
