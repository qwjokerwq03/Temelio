import React from 'react';
import './SideNav.css';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
  return (
      <div className="sidebar">
        <nav>
          <ul>
            <li><NavLink exact to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
            <li><NavLink to="/email-template" activeClassName="active">Email Template</NavLink></li>
            <li><NavLink to="/send-emails" activeClassName="active">Send Emails</NavLink></li>
            <li><NavLink to="/sent-emails" activeClassName="active">Sent Emails</NavLink></li>
            <li><NavLink to="/foundations" activeClassName="active">Foundations</NavLink></li>
            <li><NavLink to="/nonprofits" activeClassName="active">Nonprofits</NavLink></li>
          </ul>
        </nav>
        {/* Logout button */}
        <div className="logout">
          <button>Logout</button>
        </div>
      </div>
  );
};

export default SideNav;
