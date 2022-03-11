import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login/Login';
import Foods from './pages/Foods/Foods';
import Drinks from './pages/Drinks/Drinks';
import Explore from './pages/Explore/Explore';
import ExploreFoods from './pages/ExploreFoods/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks/ExploreDrinks';
import
ExploreFoodsIngredients
from './pages/ExploreFoodsIngredients/ExploreFoodsIngredients';
import
ExploreDrinkIngredients
from './pages/ExploreDrinkIngredients/ExploreDrinkIngredients';
import
ExploreFoodsNationalities
from './pages/ExploreFoodsNationalities/ExploreFoodsNationalities';
import Profile from './pages/Profile/Profile';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import RecipeFood from './pages/RecipeFood/RecipeFood';
import RecipeDrink from './pages/RecipeDrink/RecipeDrink';
import FoodsInProgress from './pages/FoodInProgress/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress/DrinkInProgress';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/foods/:id" component={ RecipeFood } />
          <Route exact path="/drinks/:id" component={ RecipeDrink } />
          <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreFoodsIngredients }
          />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreDrinkIngredients }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreFoodsNationalities }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </RecipeProvider>
  );
}

export default App;
