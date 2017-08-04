import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { Redirect } from 'react-router';
import { PropTypes } from 'prop-types';
import { setToaster } from '../../actions/toaster';
import { addUserForm, addUserInBack } from '../../actions/register';
import WizardFirstPage from './wizardfirst';
import { defaultRoute } from '../../routes';
import WizardSecondPage from './wizardsecond';
import WizardThirdPage from './wizardthird';
import Spinner from '../../containers/spinner';
import './register.css';

class Register extends Component {

  state = {
    showToaster: true,
    page: 1,
  }

  // componentWillReceiveProps(nextProps) {
  //   const { user } = nextProps;
  //   const { setToaster } = this.props;
  //   const { showToaster } = this.state;
  //   if (!user) return null;
  //   if (!user.confirmed && user.status === 'response' && showToaster) {
  //     this.setState({ showToaster: false });
  //     setToaster({ message: 'Please check your email for confirmation', intent: 'success' });
  //   }
  // }

  handleSubmit = (user) => {
    const { addUserForm, addUserInBack } = this.props;
    addUserForm({ ...user, status: 'pending' });
    addUserInBack(user);
  };

  previousPage = () => {
    const { page } = this.state;
    this.setState({ page: page - 1 });
  }

  nextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  }

  render() {
    const { page } = this.state;
    const { status } = this.props.user || {};
    const { user } = this.props;
    if (user) return <Redirect to={defaultRoute().path} />;
    return (
      <div>
        <div className="home-container">
          { status !== 'pending' && page === 1 && <WizardFirstPage onSubmit={this.nextPage} /> }
          { status !== 'pending' && page === 2 && <WizardSecondPage previousPage={this.previousPage} onSubmit={this.nextPage} /> }
          { status !== 'pending' && page === 3 && <WizardThirdPage previousPage={this.previousPage} onSubmit={this.handleSubmit} /> }
          { status === 'pending' && <Spinner />}
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  addUserForm: PropTypes.func.isRequired,
  addUserInBack: PropTypes.func.isRequired,
  setToaster: PropTypes.func.isRequired,
  user: PropTypes.object,
};

Register.defaultProps = {
  user: null,
};

const getState = (state) => state.currentUser;

const mapStateToProps = createStructuredSelector({
  user: createSelector([getState], (state) => state.user),
});

const mapDispatchToProps = {
  addUserForm,
  setToaster,
  addUserInBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
