import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../auth.css';

const ForgetPasswordView = (() => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { target: { email: { value } } } = evt;
    axios.get('http://127.0.0.1:3004/lost_password', {
      params: {
        email: value,
      },
    })
    .then((res) => {
      console.log(res); // eslint-disable-line
    });
  };
  return (
    <div>
      <div className="navbar-top-right"><NavLink to="login" className="button">Login</NavLink></div>
      <div className="register-container">
        <form className="register-form-container" onSubmit={handleSubmit}>
          <h2>Forget Password</h2>
          <input type="email" name="email" placeholder="E-mail" className="input--text" />
          <button type="submit" className="button">Continue</button><br />
        </form>
      </div>
    </div>
  );
});

export default ForgetPasswordView;
