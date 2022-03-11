import React from 'react';
import propTypes from 'prop-types';

import './RecipeCard.css';

function RecipeCard({ image, name, index, testId }) {
  return (
    <section className="recipe-card" data-testid={ `${testId || index}-recipe-card` }>
      <img src={ image } alt="recipe" data-testid={ `${index}-card-img` } />
      <h3 data-testid={ `${index}-card-name` }>{name}</h3>
    </section>
  );
}

RecipeCard.propTypes = {
  image: propTypes.string,
  name: propTypes.string,
  index: propTypes.number,
}.isRequired;

export default RecipeCard;
