import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import pollIcon from '../poll.svg';
import {Layout, Menu, Dropdown, Icon, Button} from 'antd';
const Header = Layout.Header;
    
class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.reset();

        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.search = this.search.bind(this);
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    updateInputValue(evt) {
        const val = evt.target.value;
        // ...
        this.setState({
            inputValue: val
        });
    }

    reset() {
        // Always set the initial state in its own function, so that
        // you can trivially reset your components at any point.
        this.state = {
            inputValue: ''
        };
    }

    search() {
        console.log(this.state.inputValue);
        //this.props.history.replace('/house/search/' + this.state.inputValue);
        window.open('/house/search/' + this.state.inputValue, '_self')
    }

    render() {
        let menuItems;
        if(this.props.currentUser) {
          menuItems = [

          <Menu.Item key="/search">
              <input value={this.state.inputValue}
                     onChange={evt => this.updateInputValue(evt)}
                     placeholder={"Cautare"}
                     style={{ height: '34px',
                         marginRight: 'auto',
                         marginLeft: 'auto',
                         borderTopLeftRadius: '5px',
                         borderBottomLeftRadius: '5px',
                         }}
              />
              <Button onClick={this.search}

              >🔎</Button>
          </Menu.Item>,


            <Menu.Item key="/">
              <Link style={{color: 'white'}} to="/">
                <Icon type="home" className="nav-icon" />
              </Link>
            </Menu.Item>,
            <Menu.Item key="/house/new">
            <Link style={{color: 'white'}} to="/house/new">
              <Icon type="plus" alt="poll" className="poll-icon" />
            </Link>
          </Menu.Item>,
          <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu 
                  currentUser={this.props.currentUser} 
                  handleMenuClick={this.handleMenuClick}/>
            </Menu.Item>
          ]; 
        } else {
          menuItems = [
            <Menu.Item key="/login">
              <Link style={{color: 'white'}} to="/login">Login</Link>
            </Menu.Item>,
            <Menu.Item key="/signup">
              <Link style={{color: 'white'}} to="/signup">Inregistrare</Link>
            </Menu.Item>                  
          ];
        }

        return (
            <Header className="app-header"
                    style={{backgroundColor: '#001c55',  //'#2C2D31',
                            color: 'white'}}>
            <div >
              <div className="app-title" >
                <Link style={{color:'#5aa6d1',
                              fontFamily:'Copperplate Gothic Light',
                              fontSize:35,
                              marginLeft:"30px"}} to="/">Emperia</Link>
              </div>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px',
                         backgroundColor: '#5aa6d1',
                         color: 'white'}} >
                  {menuItems}
              </Menu>
            </div>
          </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu  onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {props.currentUser.name}
        </div>
        <div className="username-info">
          @{props.currentUser.username}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link  to={`/users/${props.currentUser.username}`}>Profil</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Delogare
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">
         <Icon type="user" className="nav-icon" style={{marginRight: 0, color: 'white'}} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}


export default withRouter(AppHeader);