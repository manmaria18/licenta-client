import React, { Component } from 'react';
import { Button } from 'antd';
import {submitIndex} from "../util/APIUtils";

class IndexForm extends Component {
    state = {
        inputValue: 0
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleSubmit = (e) => {
        console.log("GOOD");
        // e.preventDefault();
        const {inputValue} = this.state;
        const {billId, handleSuccess, handleFailure} = this.props;
        submitIndex({
            index: inputValue,
            billId: billId,
        }).then((newBill) => {
            handleSuccess(newBill);
        }).catch(() => {
            handleFailure();
        });
    };

    render(){
        const { inputValue } = this.state;
        return (
            <div onSubmit={this.handleSubmit}>
                <input type="number" value={inputValue} onChange={this.handleInputChange} />
                <Button
                    onClick={()=> this.handleSubmit()}
                    className="btn read-more"
                    style={{ backgroundColor: 'green', color: 'white' }}
                >
                    Transmit index
                </Button>
            </div>
        );
    }
}

export default IndexForm;