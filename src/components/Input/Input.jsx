import React from 'react';
import propTypes from 'prop-types';

import './Input.css';

function Input(props) {
  const {
    label = null,
    id = null,
    name,
    type,
    value,
    placeholder = null,
    testId = null,
    onChange = null,
    disabled = false,
    searchFilter,
  } = props;

  return (
    <label
      htmlFor={ id || name }
      className={ searchFilter === value ? 'label-active' : '' }
    >
      <input
        name={ name }
        type={ type }
        id={ id || name }
        value={ value }
        placeholder={ placeholder }
        data-testid={ testId }
        onChange={ onChange }
        disabled={ disabled }
        className="input"
        required
      />
      {label}
    </label>
  );
}

Input.propTypes = {
  props: propTypes.shape({
    name: propTypes.string,
    label: propTypes.string,
    type: propTypes.string,
    onChange: propTypes.func,
    testId: propTypes.string,
    value: propTypes.string,
  }),
}.isRequired;

export default Input;
