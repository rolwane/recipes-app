import React from 'react';
import propTypes from 'prop-types';

import './Button.css';

function Button(props) {
  const {
    children = null,
    title = '',
    testId = null,
    onClick = null,
    className = null,
  } = props;

  return (
    <button
      type="button"
      data-testid={ testId }
      onClick={ onClick }
      className={ className }
    >
      { title || children }
    </button>
  );
}

Button.propTypes = {
  children: propTypes.any,
  title: propTypes.string,
  testId: propTypes.string,
  onClick: propTypes.func,
}.isRequired;

export default Button;
