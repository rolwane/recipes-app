import React from 'react';
import propTypes from 'prop-types';

import './RecomendationCard.css';

function RecomendationCard({ image, name, index }) {
  return (
    <section className="recipe-card" data-testid={ `${index}-recomendation-card` }>
      <img src={ image } alt="recipe" data-testid={ `${index}-card-img` } />
      <h3 data-testid={ `${index}-card-name` }>{name}</h3>
    </section>
  );
}

RecomendationCard.propTypes = {
  image: propTypes.string,
  name: propTypes.string,
  index: propTypes.number,
}.isRequired;

export default RecomendationCard;
