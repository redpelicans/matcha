import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import inputField from '../../containers/inputField';
import validate from '../../../lib/validatorForm';

const createReduxForm = reduxForm({
  form: 'userRegister',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
});

const Form = ({ handleSubmit, submitting, previousPage, pristine }) => (
  <form className="auth-container" onSubmit={handleSubmit}>
    <h2>Account</h2>
    <Field type="text" name="login" placeholder="Login" component={inputField} />
    <Field type="email" name="email" placeholder="E-mail" component={inputField} />
    <Field type="password" name="password" placeholder="Password" component={inputField} />
    <div className="groupbutton marger-input  " >
      <button type="button" className="pt-button pt-large pt-fill pt-icon-standard pt-icon-arrow-left" onClick={previousPage}>
        Previous
      </button>
      <button type="submit" className="pt-button pt-large pt-fill" disabled={pristine || submitting}>
        Submit
        <span className="pt-icon-standard pt-icon-floppy-disk pt-align-right" />
      </button>
    </div>
  </form>
  );

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};
const wrapper = createReduxForm(Form);

export default wrapper;
