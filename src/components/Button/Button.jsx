import React from 'react';
import propTypes from 'prop-types';

function Button(props) {
  const { title, testId = null, onClick = null } = props;

  return (
    <button
      type="button"
      data-testid={ testId }
      onClick={ onClick }
    >
      { title }
    </button>
  );
}

Button.propTypes = {
  props: propTypes.shape({
    title: propTypes.string,
    testId: propTypes.string,
    onClick: propTypes.func,
  }),
}.isRequired;

export default Button;
