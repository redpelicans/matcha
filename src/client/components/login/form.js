import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import validate from '../../../lib/validatorForm';
import inputField from '../../containers/inputField';

const createReduxForm = reduxForm({
  form: 'login',
  validate,
});

const Form = ({ handleSubmit, submitting, pristine }) => (
  <form className="auth-container" onSubmit={handleSubmit}>
    <h2>Login</h2>
    <Field type="text" name="login" placeholder="Login" component={inputField} />
    <Field type="password" name="password" placeholder="Password" component={inputField} /><br />
    <button type="submit" className="pt-button pt-large pt-fill" disabled={pristine || submitting}>
    Log In
    </button>
  </form>
  );

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};
const wrapper = createReduxForm(Form);

export default wrapper;
