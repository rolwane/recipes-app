import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import { getTwelvesFoods } from '../services/foodsAPI';
import { getTwelvesDrinks } from '../services/drinksAPI';
import { MAX_FOODS_AND_DRINKS } from '../helpers/constants';

function ContextProvider({ children }) {
  const [routeProps, setRouteProps] = useState({});
  const [foodsRecipe, setFoodsRecipe] = useState([]);
  const [drinksRecipe, setDrinksRecipe] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  useEffect(() => {
    getTwelvesFoods()
      .then((response) => {
        const foods = response.meals.slice(0, MAX_FOODS_AND_DRINKS);
        setFilteredFoods(foods);
        setFoodsRecipe(foods);
      });
    getTwelvesDrinks()
      .then((response) => {
        const drinks = response.drinks.slice(0, MAX_FOODS_AND_DRINKS);
        setFilteredDrinks(drinks);
        setDrinksRecipe(drinks);
      });
  }, []);

  const values = {
    routeProps,
    setRouteProps,
    foodsRecipe,
    drinksRecipe,
    filteredFoods,
    setFilteredFoods,
    filteredDrinks,
    setFilteredDrinks,
  };

  return (
    <RecipeContext.Provider value={ values }>
      {children}
    </RecipeContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: propTypes.any,
}.isRequired;

export default ContextProvider;
