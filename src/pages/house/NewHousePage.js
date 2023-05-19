import React, { Component } from 'react';
import { createHouse, getAllServices } from '../../util/APIUtils';
import './NewHousePage.css';
import {Button, Form, notification} from 'antd';
import LocationSection from '../../components/input/LocationSection'
import NameSection from '../../components/input/NameSection'
import ServicesSection from '../../components/input/ServiceSection'
import CurveDownSvg from "../../components/design/CurveDownSvg";

const FormItem = Form.Item;

class NewHousePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            services: [],
            location: {
                coordinates: null,
            },
            selectedServices: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.loadAllServices = this.loadAllServices.bind(this);
        this.selectService = this.selectService.bind(this);
        this.unselectService = this.unselectService.bind(this);
        this.isServiceSelected = this.isServiceSelected.bind(this);
    }

    componentDidMount() {
        this.loadAllServices();
    }

    selectService(id) {
        const selectedServices = [...this.state.selectedServices, id];
        this.setState({
            selectedServices,
        });
    }

    unselectService(id) {
        const selectedServices = this.state.selectedServices.filter(selectedId => selectedId !== id);
        this.setState({
            selectedServices,
        });
    }

    isServiceSelected(id) {
        return this.state.selectedServices.includes(id);
    }

    loadAllServices() {
        let promise = getAllServices();

        if (!promise) {
            return;
        }

        promise
            .then(response => {
                this.setState({
                    services: response,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        const home = {
            name: this.state.name,
            location: this.state.location.coordinates,
            services: this.state.selectedServices.map(selectedId => ({
                id: selectedId,
            })),
        };

        createHouse(home)
            .then(response => {
                this.props.history.push("/");
            })
            .catch(error => {
                if (error.status === 401) {
                    this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to create a house!');
                } else {
                    notification.error({
                        message: 'Emperia',
                        description: error.message || 'Sorry! Something went wrong. Please try again!',
                    });
                }
            });
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({
            name: value,
        });
    }

    handleLocationChange(event) {
        let coordinates = {
            latitude: event.latLng[0],
            longitude: event.latLng[1],
        };

        this.setState({
            location: {
                coordinates: coordinates,
            },
        });
    }

    isFormInvalid() {
        return !this.state.name || !this.state.location.coordinates;
    }

    render() {
        const { name, services, location, selectedServices } = this.state;
        const locations = location.coordinates ? [location.coordinates] : [];

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>

                    <div className="wrap" style={{ height: "150px" }}>
                        <section className="grid grid-pad services">
                            <h1>Adauga o noua locuinta!</h1>
                        </section>
                    </div>

                    <div className="wrap" style={{ height: "150px" }}>
                        <section className="grid grid-pad services">
                            <h1>1. Locatie:</h1>
                        </section>
                    </div>

                    <CurveDownSvg/>

                    <LocationSection
                        locations={locations}
                        onLocationChange={this.handleLocationChange}
                    />


                    <div className="wrap" style={{ height: "150px" }}>
                        <section className="grid grid-pad services">
                            <h1>2. Denumire:</h1>
                        </section>
                    </div>

                    <NameSection
                        name={name}
                        onNameChange={this.handleNameChange}
                    />

                    <div className="wrap" style={{ height: "150px" }}>
                        <section className="grid grid-pad services">
                            <h1>3. Servicii:</h1>
                        </section>
                    </div>

                    <ServicesSection
                        services={services}
                        selectedServices={selectedServices}
                        selectService={this.selectService}
                        unselectService={this.unselectService}
                        isServiceSelected={this.isServiceSelected}
                    />
                    <FormItem className="poll-form-row">
                        <Button
                            type="primary"
                            style={{
                                fontSize: '30px',
                                width: '50%',
                                height: '100px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                display: 'block',
                                textAlign: 'center',
                            }}
                            htmlType="submit"
                            size="large"
                            disabled={this.isFormInvalid()}
                            className="create-poll-form-button"
                        >
                            Adauga
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default NewHousePage;