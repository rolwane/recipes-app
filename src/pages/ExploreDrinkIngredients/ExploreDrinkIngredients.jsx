import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';

import { getIngredientsDrink, getDrinksByIngredients } from '../../services/drinksAPI';
import { MAX_FOODS_AND_DRINKS } from '../../helpers/constants';

// imported components
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import DrinkIngredientCard from
'../../components/DrinkIngredientCard/DrinkIngredientCard';

function ExploreDrinkIngredients({ history }) {
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { setDrinkList } = useContext(RecipeContext);

  useEffect(() => {
    getIngredientsDrink().then(({ drinks }) => setIngredients(drinks));
  }, []);

  const handleSelectIngredient = (ingredient) => {
    getDrinksByIngredients(ingredient).then(({ drinks }) => {
      setDrinkList(drinks);
      setRedirect(true);
    });
  };

  useEffect(() => {
    if (redirect) history.push('/drinks');
  }, [redirect]);

  return (
    <section>
      <Header title="Explore Ingredients" />
      <div className="ingredients-container">
        {
          ingredients.map((ingredient, index) => (

            index < MAX_FOODS_AND_DRINKS && (
              <DrinkIngredientCard
                key={ index }
                index={ index }
                data={ ingredient }
                onClick={ () => handleSelectIngredient(ingredient.strIngredient1) }
              />
            )

          ))
        }
      </div>

      <Footer />
    </section>
  );
}

ExploreDrinkIngredients.propTypes = {
  history: propTypes.object,
}.isRequired;

export default ExploreDrinkIngredients;
