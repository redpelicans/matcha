import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { loginRequest } from './actions';
import { defaultRoute } from '../../routes';
import { setToaster } from '../toaster/actions';
import FormLogin from './form';
import '../register/register.css';

class Login extends Component {

  state = {
    showToaster: true,
  }

  componentWillMount() {
    const { user, history } = this.props;
    if (user) history.replace(defaultRoute().path);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    const { showToaster } = this.state;
    const { setToaster } = this.props;
    if (!user) return null;
    if (!user.confirmed && user.status === 'response' && showToaster) {
      setToaster({ message: 'Please check your email for confirmation', intent: 'success' });
      this.setState({ showToaster: false });
    }
  }

  handleSubmit = ({ login, password }) => {
    const { loginRequest } = this.props;
    loginRequest({ login, password });
  };

  render() {
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
  history: PropTypes.object.isRequired,
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
