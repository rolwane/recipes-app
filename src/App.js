import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login/Login';

function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </RecipeProvider>
  );
}

export default App;
