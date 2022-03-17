import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';

import { getIngredientsFoods, getFoodsByIngredients } from '../../services/foodsAPI';
import { MAX_FOODS_AND_DRINKS } from '../../helpers/constants';

// imported components
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import FoodIngredientCard from '../../components/FoodIngredientCard/FoodIngredientCard';

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
      <div className="ingredients-container">
        {
          ingredients.map((ingredient, index) => (
            index < MAX_FOODS_AND_DRINKS && (
              <FoodIngredientCard
                key={ ingredient.idIngredient }
                index={ index }
                data={ ingredient }
                onClick={ () => handleSelectIngredient(ingredient.strIngredient) }
              />
            )

          ))
        }
      </div>

      <Footer />
    </section>
  );
}

ExploreFoodsIngredients.propTypes = {
  history: propTypes.object,
}.isRequired;

export default ExploreFoodsIngredients;
