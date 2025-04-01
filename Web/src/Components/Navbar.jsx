import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-links">
          <li>
            <a href="/another-page" className="nav-link">
              Another page
            </a>
          </li>
          <li>
            <a href="/another-page" className="nav-link">
              Another page
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;