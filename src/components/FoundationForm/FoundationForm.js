import React, { useState } from 'react';
import FoundationService from '../../services/FoundationService';
import './FoundationForm.css'; // Import CSS file for styling

const FoundationForm = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    FoundationService.createFoundation({ email });
    console.log(email);
    onClose();
  };

  return (
    <div className='foundation-form'>
      <div className="backdrop" onClick={onClose}></div>
      <div className="popup">
        <div className="popup-inner">
          <h2>Add Foundation</h2>
          <form onSubmit={handleSubmit}>
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

export default FoundationForm;
