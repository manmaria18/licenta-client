import React, { Component } from 'react';
import {confirmPayment, createPaymentIntent, getBill, getHouse} from '../../util/APIUtils';
import BillsList from "../../components/bill/BillList";


class PayedBillsOfAHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: []
        };
    }

    componentDidMount() {
        const { match } = this.props;
        const billId = match.params.billId;

        confirmPayment([billId]).then(res => {
            console.log(res)
            getBill(billId).then(res => {
                console.log(res)
                this.setState({
                    bills: [res]
                });
            })
        });
    }



    render() {

        return (
            <div>
                <div> Plata efectuata cu succes ❤️</div>
                <BillsList
                    bills={this.state.bills}
                    history={this.props.history}
                />

            </div>
        );
    }
}

export default PayedBillsOfAHouse;