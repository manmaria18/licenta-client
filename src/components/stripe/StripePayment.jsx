import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { createPaymentIntent } from '../../util/APIUtils';

import CheckoutForm from "./CheckoutForm";
import "./StripePayment.css";

const stripePromise = loadStripe("pk_test_51NHT9TBiCn55Y1cl03AxR8eI0yHQwx6QAr2SWVKl6JsBi4wqAOPQQxawVs8phloVpxjGeBkmWub1XsKoCkv5x1Pe00n78Rr0sq");

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