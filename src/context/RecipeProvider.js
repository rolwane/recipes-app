import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function ContextProvider({ children }) {
  const [routeProps, setRouteProps] = useState({});
  const [foodList, setFoodList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);

  const values = {
    routeProps,
    setRouteProps,
    foodList,
    setFoodList,
    drinkList,
    setDrinkList,
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
