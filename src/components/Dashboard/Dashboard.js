// Dashboard.js
import React, { useState } from 'react';
import FoundationForm from '../FoundationForm/FoundationForm';
import NonprofitForm from '../NonprofitForm/NonprofitForm';
import './Dashboard.css'; // Import CSS file for styling

const Dashboard = () => {
  const [isFoundationFormOpen, setIsFoundationFormOpen] = useState(false);
  const [isNonprofitFormOpen, setIsNonprofitFormOpen] = useState(false);

  const openFoundationForm = () => {
    setIsFoundationFormOpen(true);
  };

  const openNonprofitForm = () => {
    setIsNonprofitFormOpen(true);
  };

  const closeFoundationForm = () => {
    setIsFoundationFormOpen(false);
  };

  const closeNonprofitForm = () => {
    setIsNonprofitFormOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Button to open FoundationForm */}
      <button className="dashboard-button" onClick={openFoundationForm}>Add Foundation</button>
      {/* Button to open NonprofitForm */}
      <button className="dashboard-button" onClick={openNonprofitForm}>Add Nonprofit</button>

      {/* Render FoundationForm as a popup if isFoundationFormOpen is true */}
      {isFoundationFormOpen && <FoundationForm onClose={closeFoundationForm} />}
      
      {/* Render NonprofitForm as a popup if isNonprofitFormOpen is true */}
      {isNonprofitFormOpen && <NonprofitForm onClose={closeNonprofitForm} />}
    </div>
  );
};

export default Dashboard;
