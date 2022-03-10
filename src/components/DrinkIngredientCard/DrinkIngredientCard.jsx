import React from 'react';
import propTypes from 'prop-types';

function DrinkIngredientCard({ index, data: { strIngredient1 } }) {
  return (
    <section data-testid={ `${index}-ingredient-card` }>
      <img
        src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
        alt="ingredient"
        data-testid={ `${index}-card-img` }
      />

      <h3 data-testid={ `${index}-card-name` }>{strIngredient1}</h3>
    </section>
  );
}

DrinkIngredientCard.propTypes = {
  index: propTypes.number,
  data: propTypes.object,
}.isRequired;

export default DrinkIngredientCard;
