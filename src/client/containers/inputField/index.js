import React from 'react';
import PropTypes from 'prop-types';
import './render.css';

const RenderField = ({ input, placeholder, type, meta: { touched, error } }) =>
  <div>
    <input
      {...input}
      placeholder={placeholder}
      type={type}
      className={` pt-fill pt-input marger-input pt-round ${error && touched ? 'pt-intent-warning warning-input' : ''} `}
    />
    {
      touched && error && <span className="pt-tag pt-intent-danger flex"> {error} </span>
    }
  </div>;

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default RenderField;
