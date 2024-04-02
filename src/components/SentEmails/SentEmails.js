import React, { useState, useEffect } from 'react';
import SentEmailService from '../../services/SentEmailService';
import './SentEmails.css'; // Import the CSS file for styling

const SentEmails = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  useEffect(() => {
    fetchSentEmails();
  }, []);

  const fetchSentEmails = async () => {
    try {
      const data = await SentEmailService.getAllEmails();
      setSentEmails(data);
    } catch (error) {
      console.error('Error fetching sent emails:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sentEmails.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="sent-emails-container">
      <h2 className="sent-emails-header">Sent Emails</h2>
      <table className="sent-emails-table">
        <thead>
          <tr>
            <th>Foundation</th>
            <th>Nonprofit</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(sentEmail => (
            <tr key={sentEmail.id}>
              <td>{sentEmail.foundationDTO.email.split('@')[0].replace('.',' ')}</td>
              <td>{sentEmail.nonprofitDTO.name}</td>
              <td>{new Date(sentEmail.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={sentEmails.length}
        paginate={paginate}
      />
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

export default SentEmails;
