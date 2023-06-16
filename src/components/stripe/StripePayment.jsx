import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { createPaymentIntent } from '../../util/APIUtils';

import CheckoutForm from "./CheckoutForm";
import "./StripePayment.css";

const stripePromise = loadStripe("pk_test_51NBG3dJTQI7e9TUW5A7FyyL2PvEFX378Al8N804B7xJV5zSoUqEuK5UlrTcGMJWzPrw2OzKJoXzL8y6VFTaIHrMp00h5jfc8qB");

export default function StripePayment({ billId }) {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        createPaymentIntent([billId])
            .then((data) => setClientSecret(data.clientSecret));
    }, [billId]);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="stripePayment">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm billId={billId}/>
                </Elements>
            )}
        </div>
    );
}