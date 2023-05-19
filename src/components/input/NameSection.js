import React from 'react';
import FormItem from "antd/es/form/FormItem";
import {Input} from "antd";

const NameSection = ({ name, onNameChange }) => {
    return (

        <FormItem validateStatus={name ? 'success' : ''} className="poll-form-row">
            <Input
                placeholder="numele casei/numele firmei"
                style={{
                    fontSize: '30px',
                    width: '50%',
                    height: '100px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
                    textAlign: 'center',
                }}
                name="name"
                value={name}
                onChange={onNameChange}
            />
        </FormItem>
    );
};

export default NameSection;