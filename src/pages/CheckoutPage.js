import React from 'react';
import './CheckoutPage.css';

const CheckoutPage = ({ actionType }) => {
  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <div className="form-section">
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" placeholder="Enter your full name" />
        </div>

        <div className="form-section">
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div className="form-section">
          <label htmlFor="credit-card">Credit Card Number:</label>
          <input type="text" id="credit-card" placeholder="1234 5678 9101 1121" />
        </div>

        <div className="form-section">
          <label>Expiration Date:</label>
          <div className="expiration-inputs">
            <input type="text" placeholder="MM" />
            <input type="text" placeholder="YY" />
          </div>
        </div>

        <div className="form-section">
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" placeholder="123" />
        </div>

        <button className="checkout-button">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
