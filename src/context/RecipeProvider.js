import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function ContextProvider({ children }) {
  const [routeProps, setRouteProps] = useState({});

  const values = {
    routeProps,
    setRouteProps,
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
