import React, { useState, useEffect } from 'react';
import NonprofitService from '../../services/NonprofitService';
import { FaTrash } from 'react-icons/fa'; // Import the delete icon
import './NonprofitList.css'; // Import the CSS file for styling
import FoundationService from '../../services/FoundationService';
import SentEmailService from '../../services/SentEmailService';

const NonprofitList = () => {
  const [nonprofits, setNonprofits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [selectedNonprofits, setSelectedNonprofits] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [foundations, setFoundations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNonprofits();
    fetchFoundations();
  }, []);

  const fetchNonprofits = async () => {
    try {
      const data = await NonprofitService.getAllNonprofits();
      setNonprofits(data);
    } catch (error) {
      console.error('Error fetching nonprofits:', error);
    }
  };
  const fetchFoundations = async () => {
    try {
      const data = await FoundationService.getAllFoundations();
      setFoundations(data);
    } catch (error) {
      console.error('Error fetching foundations:', error);
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nonprofits.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteNonprofit = async (email) => {
    // Add code to handle deletion of nonprofit
    const data = await NonprofitService.deleteNonprofit(email);
    setNonprofits(data);
    console.log('Delete nonprofit with email:', email);
  };

  const handleCheckboxChange = (email) => {
    if (selectedNonprofits.includes(email)) {
      setSelectedNonprofits(selectedNonprofits.filter((item) => item !== email));
    } else {
      setSelectedNonprofits([...selectedNonprofits, email]);
    }
  };

  const handleSendEmail = () => {
    setShowPopup(true);
    // Add code to send email to selected nonprofits
    console.log('Sending email to selected nonprofits:', selectedNonprofits);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFoundations = foundations.filter(foundation =>
    foundation.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="nonprofit-list-container">
      <h2 className="nonprofit-list-header">Nonprofits</h2>
      <button
        className="send-email-button"
        onClick={handleSendEmail}
        disabled={selectedNonprofits.length === 0}
      >
        Send Email
      </button>
      <table className="nonprofit-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(nonprofit => (
            <tr className='nonprofit-item' key={nonprofit.email}>
              <td className='checkbox-cell'>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(nonprofit.email)}
                  checked={selectedNonprofits.includes(nonprofit.email)}
                />
              </td>
              <td>{nonprofit.name}</td>
              <td>{nonprofit.address.street}, {nonprofit.address.city}, {nonprofit.address.state}, {nonprofit.address.country}</td>
              <td>{nonprofit.email}</td>
              <td className='action-cell'>
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDeleteNonprofit(nonprofit.email)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={nonprofits.length}
        paginate={paginate}
      />
      {showPopup && (
        <Popup
          selectedNonprofits={selectedNonprofits}
          foundations={filteredFoundations}
          onClose={() => setShowPopup(false)}
          onSearchChange={handleSearchChange}
        />
      )}
    </div>
  );
};
const Popup = ({ selectedNonprofits, foundations, onClose, onSearchChange }) => {

  const sendEmails = async (email) => {
    // Add code to handle deletion of nonprofit
    await SentEmailService.sendEmails(email,selectedNonprofits);
    onClose();
    console.log('Delete nonprofit with email:', email);
  };
  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>Close</button>
        {/* <div className='nonprofits-selected'>
        <h2>Selected Nonprofits</h2>
        <ul>
          {selectedNonprofits.map(email => (
            <li key={email}>{email}</li>
          ))}
        </ul>
        </div> */}
        <div className='foundations-selected'>
        <h2>Foundations</h2>
          <input
          type="text"
          placeholder="Search Foundations"
          onChange={onSearchChange}
        />
        <ul className='foundations-select'>
          {foundations.map(foundation => (
            <button className='chips' onClick={() => sendEmails(foundation.email)} key={foundation.email}>{foundation.email.split('@')[0].replace('.',' ')}</button>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NonprofitList;
