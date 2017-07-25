import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import queryString from 'query-string';
import axios from 'axios';
import '../auth.css';

class ResetPasswordView extends Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
    const parsedQuery = queryString.parse(this.props.location.search);
    const { target: { password: { value } } } = evt;
    const data = { matchaToken: parsedQuery.matchaToken, password: value };
    axios.post('http://127.0.0.1:3004/reset_password', data)
    .then((res) => {
      console.log(res); // eslint-disable-line
    });
  }
  render() {
    return (
      <div>
        <div className="navbar-top-right"><NavLink to="login" className="button">Login</NavLink></div>
        <div className="register-container">
          <form className="register-form-container" onSubmit={this.handleSubmit}>
            <h2>Reset Password</h2>
            <input type="password" name="password" placeholder="New Password" className="input--text" />
            <button type="submit" className="button">Continue</button><br />
          </form>
        </div>
      </div>);
  }
}

ResetPasswordView.propTypes = {
  location: PropTypes.object.isRequired,
};
export default ResetPasswordView;
