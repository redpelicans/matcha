import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './flashMessage.css';

class Root extends Component {

  componentWillMount() {
    const { ifUserCheckConnected, matchaToken } = this.props;
    if (matchaToken) ifUserCheckConnected();
  }

  componentDidUpdate() {
    const { error } = this.props;
    if (error) setTimeout(() => window.location.reload(), 1000);
  }

  render() {
    const { user, error, matchaToken, didRequested } = this.props;
    const { pathname } = this.props.location;
    if (error) return <div className="flashMessage"> Error Occurred {error}</div>;
    return (
      <div>
        { !user && !matchaToken && pathname.match(/^\/auth\/reset_password/) === null && <Redirect to="/auth/register" />}
        { !user.confirmed && pathname.match(/^\/auth\/register/) && <Redirect to="/auth/login" />}
        { !matchaToken && <Redirect to="/auth/login" />}
        { matchaToken && !user.bio && user.confirmed === true && <Redirect to="/about_me" /> }
        { matchaToken && user.bio && pathname.match(/^\/auth/) && <Redirect to="/suggestion" />}
      </div>
    );
  }
}

Root.propTypes = {
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
  matchaToken: PropTypes.string,
  didRequested: PropTypes.bool.isRequired,
  ifUserCheckConnected: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

Root.defaultProps = {
  matchaToken: null,
  error: null,
};

export default Root;
