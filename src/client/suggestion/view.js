import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import './suggestion.css';

class View extends Component {

  state = {
    redirect: false,
  }

  componentWillMount() {
    const { suggestionUser } = this.props;
    suggestionUser();
  }

  handleClick = ({ target: { id } }) => {    // console.log(id);
    this.setState({ redirect: id });
  }

  render() {
    const { listUser } = this.props;
    const { redirect } = this.state;
    return (
      <div>
        { redirect && <Redirect push to={`user/${redirect}`} /> }
        <div className="navbar-top-right">
          <NavLink to="/me" className="button">Account</NavLink>
          <NavLink to="/logout" className="button">Logout</NavLink>
        </div>
        <h2 className="bold center">Some profile you may like</h2>
        <div className="container-suggestion">
          { listUser.map(user => (
            <div className="suggestion-box" onClick={this.handleClick} role="button" key={user.id} id={user.id}>
              <img src="./picture1.png" alt="profile--1" className="picture--suggestion" id={user.id} />
              <div className="name-bio-suggestion" id={user.id}>
                <span className="bold" id={user.id}>{user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}</span>, {user.age}</div>
              <div className="name-bio-suggestion" id={user.id}>Tell me about you...</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

View.propTypes = {
  listUser: PropTypes.array.isRequired,
  suggestionUser: PropTypes.func.isRequired,
};

export default View;
