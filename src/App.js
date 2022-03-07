import React from 'react';
import RecipeProvider from './context/RecipeProvider';

function App() {
  return (
    <RecipeProvider>
      Hello world
    </RecipeProvider>
  );
}

export default App;
