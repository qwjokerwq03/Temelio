import React, { useState, useEffect } from 'react';
import FoundationService from '../../services/FoundationService';
import { FaTrash } from 'react-icons/fa'; // Import the delete icon
import './FoundationList.css'; // Import the CSS file for styling

const FoundationList = () => {
  const [foundations, setFoundations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  useEffect(() => {
    fetchFoundations();
  }, []);

  const fetchFoundations = async () => {
    try {
      const data = await FoundationService.getAllFoundations();
      setFoundations(data);
    } catch (error) {
      console.error('Error fetching foundations:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = foundations.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteFoundation = async (email) => {
    // Add code to handle deletion of foundation
    const data = await FoundationService.deleteFoundationByEmail(email);
    setFoundations(data);
    console.log('Delete foundation with email:', email);
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="foundation-list-container">
      <h2 className="foundation-list-header">Foundations</h2>
      <table className="foundation-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(foundation => (
            <tr key={foundation.email} className="foundation-row">
              <td>{foundation.email.split('@')[0].replaceAll('.',' ')}</td>
              <td>{foundation.email}</td>
              <td className='delete-icon'>
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDeleteFoundation(foundation.email)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={foundations.length}
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

export default FoundationList;
