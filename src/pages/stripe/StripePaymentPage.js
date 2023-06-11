import React, { Component } from "react";
import StripePayment from "../../components/stripe/StripePayment";

class StripePaymentPage extends Component {
    render() {
        const { match } = this.props;
        const billId = match.params.billId;

        return (
            <div>
                <StripePayment billId={billId} />
            </div>
        );
    }
}

export default StripePaymentPage;