import React from 'react';
import './AccountInfo.css';

const AccountInfo = () => {
    const fakeUser = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe123',
      password: '**********', // Placeholder password
      creditCard: {
        number: '1234*******234',
        expiry: '12/25',
        cvv: '***'
      }
    };

  return (
    <div className="account-info-container">
      <h1 className="account-heading">My Account</h1>
      <div className="billing-info">
        <p>Your current plan is <strong>Fast Start</strong>. The next billing statement is on <strong>1/8/2024</strong>.</p>
      </div>

      <div className="account-details">
        <div className="account-detail-item">
          <label>First Name</label>
          <div className="account-detail-value">{fakeUser.firstName}</div>
        </div>
        <div className="account-detail-item">
          <label>Last Name</label>
          <div className="account-detail-value">{fakeUser.lastName}</div>
        </div>
        <div className="account-detail-item">
          <label>Username</label>
          <div className="account-detail-value">{fakeUser.username}</div>
        </div>
        <div className="account-detail-item">
          <label>Password</label>
          <div className="account-detail-value">{fakeUser.password}</div>
        </div>
        <div className="account-detail-item">
          <label>Credit Card Number</label>
          <div className="account-detail-value">**** **** **** {fakeUser.creditCard.number.slice(-4)}</div>
        </div>
        <div className="account-detail-item">
          <label>Expiry Date</label>
          <div className="account-detail-value">{fakeUser.creditCard.expiry}</div>
        </div>
        <div className="account-detail-item">
          <label>CVV</label>
          <div className="account-detail-value">{fakeUser.creditCard.cvv.replace(/./g, '*')}</div>
        </div>
      </div>

      <button className="edit-btn">Edit</button>
    </div>
  );
};

export default AccountInfo;
