import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import validate from '../../../lib/validatorForm';
import inputField from '../../containers/inputField';

const createReduxForm = reduxForm({
  form: 'userRegister',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
});

const Form = ({ handleSubmit, previousPage }) => (
  <form className="auth-container" onSubmit={handleSubmit}>
    <h2>Info</h2>
    <Field type="number" name="age" placeholder="Your Age" max="99" min="18" component={inputField} />
    <div className="pt-select marger-input pt-fill">
      <Field component="select" name="sexe">
        <option >Your Sexe</option>
        <option value="men" defaultValue>Men</option>
        <option value="women">Women</option>
      </Field>
    </div>
    <div className="groupbutton marger-input  " >
      <button type="button" className="pt-button pt-large pt-fill pt-icon-standard pt-icon-arrow-left" onClick={previousPage}>
        Previous
      </button>
      <button type="submit" className="pt-button pt-large pt-fill">
        Next
        <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
      </button>
    </div>
  </form>
  );

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

const wrapper = createReduxForm(Form);

export default wrapper;
