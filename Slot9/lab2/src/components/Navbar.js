import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Movie Explorer</div>
      <ul className="navbar-links">
        <li>
          <NavLink exact to="/" activeClassName="active">Free Movies</NavLink>
        </li>
        <li>
          <NavLink to="/favourites" activeClassName="active">My Favourite Movies</NavLink>
        </li>
        <li>
          <NavLink to="/request" activeClassName="active">Movie Request Form</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
