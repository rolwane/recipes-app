import React from 'react';
import propTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function ContextProvider({ children }) {
  return (
    <RecipeContext.Provider>
      {children}
    </RecipeContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: propTypes.any,
}.isRequired;

export default ContextProvider;
