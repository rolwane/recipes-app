import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import { getTwelvesFoods } from '../services/foodsAPI';
import { getTwelvesDrinks } from '../services/drinksAPI';
import { MAX_FOODS_AND_DRINKS, MAX_LENGTH_RECOMMENDS } from '../helpers/constants';

function RecipeProvider({ children }) {
  const [routeProps, setRouteProps] = useState({});
  const [foodsRecipe, setFoodsRecipe] = useState([]);
  const [drinksRecipe, setDrinksRecipe] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [recomendsDrinks, setRecomendsDrinks] = useState([]);
  const [recomendsFoods, setRecomendsFoods] = useState([]);

  useEffect(() => {
    getTwelvesFoods()
      .then((response) => {
        const foods = response.meals.slice(0, MAX_FOODS_AND_DRINKS);
        setFoodList(foods);
        setFoodsRecipe(foods);
        setRecomendsFoods(foods.slice(0, MAX_LENGTH_RECOMMENDS));
      });

    getTwelvesDrinks()
      .then((response) => {
        const drinks = response.drinks.slice(0, MAX_FOODS_AND_DRINKS);
        setDrinkList(drinks);
        setDrinksRecipe(drinks);
        setRecomendsDrinks(drinks.slice(0, MAX_LENGTH_RECOMMENDS));
      });
  }, []);

  const values = {
    routeProps,
    foodsRecipe,
    drinksRecipe,
    foodList,
    drinkList,
    setRouteProps,
    setFoodList,
    setDrinkList,
    recomendsDrinks,
    recomendsFoods,
  };

  return (
    <RecipeContext.Provider value={ values }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: propTypes.any,
}.isRequired;

export default RecipeProvider;
