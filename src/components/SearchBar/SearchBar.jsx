import React, { useState, useContext, useEffect } from 'react';
import RepiceContext from '../../context/RecipeContext';

import { getFoodsBySearchBar } from '../../services/foodsAPI';
import { getDrinksBySearchBar } from '../../services/drinksAPI';
import { MAX_FOODS_AND_DRINKS, NO_RECIPE_FOUND } from '../../helpers/constants';

// imported components
import Input from '../Input/Input';

function SearchBar() {
  const {
    routeProps: { history, match: { path } },
    setFoodList,
    setDrinkList,
    foodList,
    drinkList,
  } = useContext(RepiceContext);

  const [search, setSearch] = useState('');
  const [searchFilter, setsearchFilter] = useState('');

  const loadDrinks = async () => {
    const data = await getDrinksBySearchBar(search, searchFilter);

    if (data.drinks === null) {
      global.alert(NO_RECIPE_FOUND);
      return;
    }

    setDrinkList(data.drinks.slice(0, MAX_FOODS_AND_DRINKS));
    // setDrinks(data.drinks.slice(0, MAX_FOODS_AND_DRINKS));
  };

  const loadFoods = async () => {
    const data = await getFoodsBySearchBar(search, searchFilter);

    if (data.meals === null) {
      global.alert(NO_RECIPE_FOUND);
      return;
    }

    setFoodList(data.meals.slice(0, MAX_FOODS_AND_DRINKS));
    // setfoods(data.meals.slice(0, MAX_FOODS_AND_DRINKS));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (searchFilter === 'f' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    if (path.includes('/drinks')) {
      loadDrinks();
      return;
    }

    loadFoods();
  };

  const redirectToDetails = (type, id, state) => {
    const idRecipe = state[0][id];
    history.push(`/${type}/${idRecipe}`);
  };

  useEffect(() => {
    if (drinkList.length === 1) redirectToDetails('drinks', 'idDrink', drinkList);
    if (foodList.length === 1) redirectToDetails('foods', 'idMeal', foodList);
  }, [drinkList, foodList]);

  return (
    <form onSubmit={ handleSubmit }>

      <Input
        type="text"
        name="search"
        value={ search }
        placeholder="Buscar..."
        testId="search-input"
        onChange={ ({ target: { value } }) => setSearch(value) }
      />

      <Input
        label="Ingredients"
        type="radio"
        id="ingredient-search-radio"
        name="search-category"
        testId="ingredient-search-radio"
        value="i"
        onChange={ ({ target: { value } }) => setsearchFilter(value) }
      />

      <Input
        label="Name"
        type="radio"
        name="search-category"
        id="name-search-radio"
        testId="name-search-radio"
        value="s"
        onChange={ ({ target: { value } }) => setsearchFilter(value) }
      />

      <Input
        label="First Letter"
        type="radio"
        name="search-category"
        id="first-letter-search-radio"
        testId="first-letter-search-radio"
        value="f"
        onChange={ ({ target: { value } }) => setsearchFilter(value) }
      />

      <Input
        type="submit"
        testId="exec-search-btn"
        value="Search"
      />

    </form>
  );
}

export default SearchBar;
