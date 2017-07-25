import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import '../userprofile/userprofile.css';
import '../authentication/auth.css';

class View extends Component {
  state = {

  }

  render() {
    const { user } = this.props;
    if (!user) return (<div>is Fetching...</div>);
    return (
      <div className="container">
        <div className="navbar-top-right">
          <NavLink to="/about_me/account" className="button">Update Profil infos ? </NavLink>
          <NavLink to="/suggestion" className="button">Update Account infos ? </NavLink>
          <NavLink to="/suggestion" className="button">Suggestion</NavLink>
          <NavLink to="/logout" className="button">Logout</NavLink>
        </div>
        <div className="user_page">
          <div className="round" >
            <img src={user.photo_5} alt="okok" />
          </div>
          <div className="header">
            <h1>{user.firstname} {user.lastname}
              {user.sexe === 'men' ? <span className="blue">&#9794;</span> : <span className="pink">&#9792;</span>}
            </h1>
            <h2>{user.age} years old</h2>
            <h2>Looking for {user.orientation === 'bisexual' &&
              <span><span className="blue">&#9794;</span><span className="pink">&#9792;</span></span>}
              {user.orientation === 'homosexual' && user.sexe === 'men' && <span className="blue">&#9794;</span>}
              {user.orientation === 'homosexual' && user.sexe === 'women' && <span className="pink">&#9792;</span>}
              {user.orientation === 'heterosexual' && user.sexe === 'men' && <span className="pink">&#9792;</span>}
              {user.orientation === 'heterosexual' && user.sexe === 'women' && <span className="blue">&#9794;</span>}
            </h2>
            <h2>{user.popularity}% popularity</h2>
            <h2>Facts about me: {user.bio}</h2><br />
            <h2>Interested by: {user.interest}</h2><br />
          </div>
        </div>
      </div>
    );
  }
}

View.propTypes = {
  user: PropTypes.object.isRequired,
};

export default View;
