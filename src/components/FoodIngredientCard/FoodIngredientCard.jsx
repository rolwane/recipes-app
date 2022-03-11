import React from 'react';
import propTypes from 'prop-types';

function FoodIngredientCard({ index, data: { strIngredient } }) {
  return (
    <section data-testid={ `${index}-ingredient-card` }>
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
}.isRequired;

export default FoodIngredientCard;
