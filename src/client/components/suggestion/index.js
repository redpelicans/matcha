import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { suggestionUser } from './actions';

import './suggestion.css';

class Suggestion extends Component {

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
    const { users } = this.props;
    return (
      <div>
        <h2 className="bold center">Some profile you may like</h2>
        <div className="container-suggestion">
          { users.map(user => (
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

Suggestion.propTypes = {
  users: PropTypes.array.isRequired,
  suggestionUser: PropTypes.func.isRequired,
};

const getState = (state) => state.suggestion;

const mapStateToProps = createStructuredSelector({
  users: createSelector([getState], (state) => state.users),
});

const mapDispatchToProps = {
  suggestionUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);
