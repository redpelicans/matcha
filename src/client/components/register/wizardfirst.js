import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import validate from '../../../lib/validatorForm';
import inputField from '../../containers/inputField';

const createReduxForm = reduxForm({
  form: 'userRegister',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
});

const Form = ({ handleSubmit }) => (
  <form className="auth-container" onSubmit={handleSubmit}>
    <h2>Inscription</h2>
    <Field type="text" name="firstname" placeholder="First Name" component={inputField} />
    <Field type="text" name="lastname" placeholder="Last Name" component={inputField} />
    <button type="submit" className="pt-button pt-large pt-fill" style={{ margin: '20px 0 20px 0' }}>
      Next
      <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
    </button>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const wrapper = createReduxForm(Form);

export default wrapper;
