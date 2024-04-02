import React, { useState } from 'react';
import NonprofitService from '../../services/NonprofitService';
import './NonprofitForm.css'; // Import CSS file for styling

const NonprofitForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const nonprofitData = {
      name,
      address,
      email
    };
    NonprofitService.createNonprofit(nonprofitData);
    onClose();
  };

  const handleAddressChange = e => {
    const { name, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="backdrop" onClick={onClose}></div>
      <div className="popup">
        <div className="popup-inner">
          <h2>Create Nonprofit</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              placeholder="Street"
              required
            />
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              placeholder="City"
              required
            />
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              placeholder="State"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleAddressChange}
              placeholder="Postal Code"
              required
            />
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              placeholder="Country"
              required
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <div className="button-group">
              <button type="submit" className="submit-button">Submit</button>
              <button onClick={onClose} className="close-button">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NonprofitForm;
