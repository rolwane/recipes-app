import React from 'react';
import propTypes from 'prop-types';

import './FoodIngredientCard.css';

function FoodIngredientCard({ index, data: { strIngredient }, onClick }) {
  return (
    <section
      data-testid={ `${index}-ingredient-card` }
      onClick={ onClick }
      aria-hidden="true"
      className="ingredient-card"
    >

      <img
        src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
        alt="ingredient"
        data-testid={ `${index}-card-img` }
      />

      <h3 data-testid={ `${index}-card-name` }>{strIngredient}</h3>
    </section>
  );
}

FoodIngredientCard.propTypes = {
  index: propTypes.number,
  data: propTypes.object,
  onClick: propTypes.func,
}.isRequired;

export default FoodIngredientCard;
