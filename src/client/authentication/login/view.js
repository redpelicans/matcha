import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../auth.css';

class View extends Component {
  state = {
    login: '',
    password: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { connectUser } = this.props;
    const { login, password } = this.state;
    connectUser({ login, password });
    // window.location.reload();
  };

  render() {
    const { login, password } = this.state;
    const { didRequested } = this.props;
    if (didRequested) window.location.reload();
    return (
      <div>
        <div className="navbar-top-right"><NavLink to="register" className="button">Pas encore Membre?</NavLink></div>
        <div className="register-container">
          <form className="register-form-container" onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <h2>Login</h2>
            <input className="input--text" type="text" name="login" placeholder="Login" value={login} />
            <input className="input--text" type="password" name="password" placeholder="Password" value={password} />
            <button type="submit" className="button">Login!</button><br />
            <NavLink to="forget_password" className="second--button">Mot de passe oublié ?</NavLink>
          </form>
        </div>
      </div>
    );
  }
}

View.propTypes = {
  didRequested: PropTypes.bool.isRequired,
  connectUser: PropTypes.func.isRequired,
};

export default View;
