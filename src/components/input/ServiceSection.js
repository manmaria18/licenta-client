import React from 'react';
import { FormItem, Button } from 'antd';

const ServicesSection = ({
                             services,
                             selectedServices,
                             selectService,
                             unselectService,
                             isServiceSelected
                         }) => {
    const serviceProviders = new Map();
    services.forEach((service) => {
        if (!serviceProviders.has(service.serviceType.type)) {
            serviceProviders.set(service.serviceType.type, []);
        }
        serviceProviders.get(service.serviceType.type).push(service);
    });

    const servicesList = [];

    for (const [key, value] of serviceProviders) {
        servicesList.push(
            <div
                key={key}
                style={{
                    fontSize: '30px',
                    width: '50%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: "#5aa6d1" }}>
                    {key}
                </div>
                {value.map((service) => (
                    <div style={{ display: 'flex', justifyContent: 'center' }} key={service.id}>
                        {isServiceSelected(service.id) ? (
                            <Button onClick={() => unselectService(service.id)}>
                                REMOVE {service.provider.name}---{service.price}
                            </Button>
                        ) : (
                            <Button onClick={() => selectService(service.id)}>
                                ADD {service.provider.name}---{service.price}
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>

            <div
                style={{
                    fontSize: '30px',
                    width: '50%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
                    textAlign: 'center',
                }}
            >
                {servicesList}
            </div>
        </div>
    );
};

export default ServicesSection;