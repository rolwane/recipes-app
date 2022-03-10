import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';

import { getIngredientsFoods, getFoodsByIngredients } from '../../services/foodsAPI';
import { MAX_FOODS_AND_DRINKS } from '../../helpers/constants';

// imported components
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import FoodIngredientCard from '../../components/FoodIngredientCard/FoodIngredientCard';
import Button from '../../components/Button/Button';

function ExploreFoodsIngredients({ history }) {
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { setFoodList } = useContext(RecipeContext);

  useEffect(() => {
    getIngredientsFoods().then(({ meals }) => setIngredients(meals));
  }, []);

  const handleSelectIngredient = (ingredient) => {
    getFoodsByIngredients(ingredient).then(({ meals }) => {
      setFoodList(meals);
      setRedirect(true);
    });
  };

  useEffect(() => {
    if (redirect) history.push('/foods');
  }, [redirect]);

  return (
    <section>
      <Header title="Explore Ingredients" />

      {
        ingredients.map((ingredient, index) => (
          index < MAX_FOODS_AND_DRINKS && (
            <Button
              onClick={ () => handleSelectIngredient(ingredient.strIngredient) }
              key={ index }
            >
              <FoodIngredientCard
                key={ ingredient.idIngredient }
                index={ index }
                data={ ingredient }
              />
            </Button>
          )

        ))
      }

      <Footer />
    </section>
  );
}

ExploreFoodsIngredients.propTypes = {
  history: propTypes.object,
}.isRequired;

export default ExploreFoodsIngredients;
