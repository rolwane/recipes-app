import React from 'react';
import propTypes from 'prop-types';

function Input(props) {
  const {
    name, label = null, type, onChange = null, testId = null, value, disabled = false,
  } = props;

  return (
    <label htmlFor={ name }>
      {label}
      <input
        name={ name }
        type={ type }
        id={ name }
        onChange={ onChange }
        data-testid={ testId }
        value={ value }
        disabled={ disabled }
      />
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
