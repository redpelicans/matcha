import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { loginRequest } from '../../actions/login';
import { setToaster } from '../../actions/toaster';
import { defaultRoute } from '../../routes';
import FormLogin from './form';
import '../register/register.css';

class Login extends Component {

  state = {
    showToaster: true,
  }

  // componentWillReceiveProps(nextProps) {
  //   const { user } = nextProps;
  //   const { showToaster } = this.state;
  //   const { setToaster } = this.props;
  //   if (!user) return null;
  //   if (!user.confirmed && user.status === 'response' && showToaster) {
  //     setToaster({ message: 'Please check your email for confirmation', intent: 'success' });
  //     this.setState({ showToaster: false });
  //   }
  // }

  handleSubmit = ({ login, password }) => {
    const { loginRequest } = this.props;
    loginRequest({ login, password });
  };

  render() {
    const { user } = this.props;
    if (user) return <Redirect to={defaultRoute().path} />;
    return (
      <div>
        <div className="home-container" >
          <FormLogin onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  setToaster: PropTypes.func.isRequired,
  user: PropTypes.object,
  loginRequest: PropTypes.func.isRequired,
};

Login.defaultProps = {
  user: null,
};

const getState = (state) => state.currentUser;

const mapStateToProps = createStructuredSelector({
  user: createSelector([getState], (state) => state.user),
});

const mapDispatchToProps = {
  loginRequest,
  setToaster,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
