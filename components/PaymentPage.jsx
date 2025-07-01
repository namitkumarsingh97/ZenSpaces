"use client"
import React, { useEffect } from 'react';

const PaymentPage = () => {
  useEffect(() => {
    const injectRazorpayButton = () => {
      const paymentButtonForm = document.getElementById('razorpay-payment-form');

      if (paymentButtonForm) {
        paymentButtonForm.innerHTML = '';
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.setAttribute('data-payment_button_id', 'pl_PBgpPPZ27b6dA4');
        script.async = true;
        paymentButtonForm.appendChild(script);
      }
    };

    injectRazorpayButton();
  }, []);

  return (
    <div className='w-full flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='bg-white p-10 rounded shadow-lg text-center'>
        <h1 className='text-2xl font-bold mb-4'>Complete Your Payment</h1>
        <form id="razorpay-payment-form" className='mt-4'>
          {/* Razorpay button will be injected here */}
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
