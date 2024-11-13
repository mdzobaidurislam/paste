'use client'

import React, { Dispatch, SetStateAction } from 'react';
import PayButton from "@/components/PaymentFrom/PayButton";
import axios from 'axios';

interface PaymentDetails {
  id: string;
  payer: {
    payer_info: {
      payer_id: string;
    };
  };
  purchase_units: Array<{
    amount: {
      value: string;
    };
  }>;
}

const PaymentForm2 = ({
  price,
  setModalOpen
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  price: number,
}) => {
  const handlePaymentSuccess = async (details: PaymentDetails) => {
    try {
      await axios.post("/api/payment", {
        orderId: details.id,
        payerId: details.payer.payer_info.payer_id,
        amount: details.purchase_units[0].amount.value,
      });
      alert("Payment successful! You now have premium access.");
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  return (
    <div className="w-full bg-primary-gradient rounded-lg shadow-lg flex flex-col md:flex-row">
      <div className="flex-1 p-6 border-b border-gray-700 md:border-b-0 md:border-r">
        <h2 className="text-xl font-bold text-indigo-400 mb-4">Order summary</h2>
        <div className="text-3xl font-semibold text-indigo-400 mb-1">€9.99 <span className="text-sm font-normal">inc. VAT</span></div>
        <p className="text-gray-400 mb-4">then €9.99 monthly</p>

        <div className="flex items-center justify-between mb-4">
          <span>Paster Premium</span>
        </div>

        <div className="space-y-2 text-gray-300">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>€{price}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 h-[50vh] overflow-y-scroll ">
        <h2 className="text-xl font-bold mb-4">Your details</h2>
        <form className="space-y-4">
          <PayButton amount="10.00" onSuccess={handlePaymentSuccess} />
        </form>
      </div>
    </div>
  );
}

export default PaymentForm2;  