import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import '../auth.css';

class View extends Component {
  state = {
    login: '',
    email: '',
    password: '',
    firstname: '',
    sexe: '',
    lastname: '',
    age: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { addUser } = this.props;
    const { login, email, password, firstname, lastname, sexe, age } = this.state;
    addUser({ login, email, password, firstname, lastname, sexe, age });
  };

  render() {
    const { login, email, password, firstname, lastname, age } = this.state;
    const { error, didRequested } = this.props;
    let redirect = false;
    if (!error && didRequested === true) redirect = true;
    return (
      <div>
        { redirect === true && <Redirect to="login" />}
        <div className="navbar-top-right"><NavLink to="login" className="button">Deja Membre?</NavLink></div>
        <div className="register-container">
          <form className="register-form-container" onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <h2>Inscription</h2>
            <input className="input--text" type="text" name="login" placeholder="Login" value={login} />
            <input className="input--text" type="email" name="email" placeholder="Email" value={email} />
            <input className="input--text" type="password" name="password" placeholder="Password" value={password} />
            <input className="input--text" type="text" name="firstname" placeholder="First Name" value={firstname} />
            <input className="input--text" type="text" name="lastname" placeholder="Last Name" value={lastname} />
            <input className="input--text" type="number" name="age" placeholder="Age" value={age} min="18" max="99" />
            <input id="men" type="radio" name="sexe" value="men" onClick={this.handleChange} className="float-left" />
            <label htmlFor="men" className="float-left">Men</label>
            <input id="women" type="radio" name="sexe" value="women" onClick={this.handleChange} className="float-right" />
            <label htmlFor="women" className="float-right">Women</label><br />
            <button type="submit" className="button">Inscription!</button>
          </form>
        </div>
      </div>
    );
  }
}

View.propTypes = {
  error: PropTypes.string,
  didRequested: PropTypes.bool.isRequired,
  addUser: PropTypes.func.isRequired,
};

View.defaultProps = {
  error: null,
};

export default View;
