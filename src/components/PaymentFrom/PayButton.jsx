// components/PayPalButton.tsx
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayButton = ({ amount, onSuccess }) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "AezHevlSmNHNLmvOXPhELkWZWCZ6aR4oIwx6cgJkkaUw_RN7NyCfUJmmr8IpJ2do5m5Wi88hu-9lUsEz" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount,
                            },
                        }],
                    });
                }}
                onApprove={async (data, actions) => {
                    try {
                        const details = await actions.order.capture();
                        console.log("Transaction completed by " + details.payer.name.given_name);
                        onSuccess(details); // Call the success handler
                    } catch (error) {
                        console.error("Error capturing order:", error);
                    }
                }}
                onError={(err) => {
                    console.error("PayPal Checkout onError", err);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayButton;