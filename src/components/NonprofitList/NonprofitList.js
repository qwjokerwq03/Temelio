import React, { useState, useEffect } from 'react';
import NonprofitService from '../../services/NonprofitService';
import { FaTrash } from 'react-icons/fa'; // Import the delete icon
import './NonprofitList.css'; // Import the CSS file for styling

const NonprofitList = () => {
  const [nonprofits, setNonprofits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchNonprofits();
  }, []);

  const fetchNonprofits = async () => {
    try {
      const data = await NonprofitService.getAllNonprofits();
      setNonprofits(data);
    } catch (error) {
      console.error('Error fetching nonprofits:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nonprofits.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteNonprofit = async (email) => {
    // Add code to handle deletion of nonprofit
    const data = await NonprofitService.deleteNonprofit(email);
    setNonprofits(data);
    console.log('Delete nonprofit with email:', email);
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="nonprofit-list-container">
      <h2 className="nonprofit-list-header">Nonprofits</h2>
      <table className="nonprofit-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(nonprofit => (
            <tr className='nonprofit-item' key={nonprofit.email}>
              <td>{nonprofit.name}</td>
              <td>{nonprofit.address.street}, {nonprofit.address.city}, {nonprofit.address.state}, {nonprofit.address.country}</td>
              <td>{nonprofit.email}</td>
              <td className='delete-icon'>
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
            <a onClick={() => paginate(number)} href="/nonprofits" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NonprofitList;
