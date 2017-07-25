import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentWillMount() {
    localStorage.removeItem('matchaToken');
    localStorage.removeItem('id');
  }
  render() {
    return (<div><Redirect to="/auth/login" /></div>);
  }
}

export default Logout;
