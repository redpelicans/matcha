import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ onLogout }) => (
  <nav className="pt-navbar">
    <div className="pt-navbar-group pt-align-left" />
    <div className="pt-navbar-group pt-align-right" >
      <span className="pt-navbar-divider" />
      <NavLink to="/login"><button className="pt-button pt-minimal pt-icon-log-in" title="Log In" /></NavLink>
      <NavLink to="/register"><button className="pt-button pt-minimal pt-icon-add" title="Register" /></NavLink>
      <NavLink to="/logout"><button className="pt-button pt-minimal pt-icon-log-out" title="Log Out" onClick={() => onLogout()} /></NavLink>
    </div>
  </nav>
);

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Header;
