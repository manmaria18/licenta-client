import React, { Component } from 'react';
import {editHouse, getAllServices, getHouse} from '../../util/APIUtils';
import './NewHousePage.css';
import {Button, Form, notification} from 'antd';
import LocationSection from '../../components/input/LocationSection'
import NameSection from '../../components/input/NameSection'
import ServicesSection from '../../components/input/ServiceSection'
import CurveDownSvg from "../../components/design/CurveDownSvg";

const FormItem = Form.Item;

class NewHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            services: [],
            location: {
                latitude: null,
                longitude: null,
            },
            selectedServices: [],
        };

        getHouse(this.props.match.params.id)
            .then((response) => {
                console.log("RESPONSE",response);
                this.setState({
                    id: response.id,
                    name: response.name,
                    location: response.location,
                    services: [],
                    selectedServices: response.services ? response.services : [],
                });
            });

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

    selectService(service) {
        let selectedServices = this.state.selectedServices.filter(selectedService => selectedService.type !== service.type);
        selectedServices = [...selectedServices,service];
        this.setState({
            selectedServices,
        });
    }

    unselectService(service) {
        const selectedServices = this.state.selectedServices.filter(selectedService => selectedService.id !== service.id);
        this.setState({
            selectedServices,
        });
    }

    isServiceSelected(service) {
        return this.state.selectedServices.some(selectedService => selectedService.id===service.id);
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
            id: this.state.id,
            name: this.state.name,
            //description: this.state.description.text,
            location: this.state.location,
            services: this.state.selectedServices.map(selectedService=> {
                return {
                    id: selectedService.id,
                }
            })
        };


        editHouse(home)
            .then(response => {
                this.props.history.push("/");
            }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create a house!.');
            } else {
                notification.error({
                    message: 'Emperia',
                    description: 'Ne pare rau!Nu s-au putut salva modificarile!'
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
            location: coordinates,
        });
    }

    isFormInvalid() {
        return !this.state.name || !this.state.location;
    }

    render() {
        const { name, services, location, selectedServices } = this.state;
        console.log("location",location)
        const locations = location ? [location] : [];

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>

                    <div className="wrap" style={{ height: "150px" }}>
                        <section className="grid grid-pad services">
                            <h1>Editeaza locuinta!</h1>
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
                            Editeaza
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default NewHouse;