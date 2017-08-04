import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './header.css';

const Header = ({ onLogout }) => (
  <nav className="pt-navbar header">
    <div className="pt-navbar-group pt-align-left" />
    <div className="pt-navbar-group pt-align-right" >
      <span className="pt-navbar-divider" />
      <Link to="/login"><button className="pt-button pt-minimal pt-icon-log-in" title="Log In" /></Link>
      <Link to="/register"><button className="pt-button pt-minimal pt-icon-add" title="Register" /></Link>
      <Link to="/logout"><button className="pt-button pt-minimal pt-icon-log-out" title="Log Out" onClick={() => onLogout()} /></Link>
    </div>
  </nav>
);

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Header;
