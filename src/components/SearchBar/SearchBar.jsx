import React, { useState, useContext, useEffect } from 'react';
import RepiceContext from '../../context/RecipeContext';
import { getFoodsBySearchBar } from '../../services/foodsAPI';
import { getDrinksBySearchBar } from '../../services/drinksAPI';

import { MAX_LENGTH_FOODS_AND_DRINKS } from '../../helpers/constants';

// imported components
import Input from '../Input/Input';

function SearchBar() {
  const {
    routeProps,
    setFoodList,
    setDrinkList,
  } = useContext(RepiceContext);

  const [search, setSearch] = useState('');
  const [searchFilter, setsearchFilter] = useState('');

  const [foods, setfoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorAlert = 'Sorry, we haven\'t found any recipes for these filters.';

    const { match: { path } } = routeProps;

    if (searchFilter === 'f' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    if (path.includes('/drinks')) {
      const data = await getDrinksBySearchBar(search, searchFilter);
      if (data.drinks === null) {
        global.alert(errorAlert);
        return;
      }
      setDrinkList(data.drinks.slice(0, MAX_LENGTH_FOODS_AND_DRINKS));
      setDrinks(data.drinks.slice(0, MAX_LENGTH_FOODS_AND_DRINKS));
      return;
    }

    const dataFood = await getFoodsBySearchBar(search, searchFilter);
    if (dataFood.meals === null) {
      global.alert(errorAlert);
      return;
    }
    setFoodList(dataFood.meals.slice(0, MAX_LENGTH_FOODS_AND_DRINKS));
    setfoods(dataFood.meals.slice(0, MAX_LENGTH_FOODS_AND_DRINKS));
  };

  const redirectToFirstCard = (type, id, state) => {
    const { history } = routeProps;
    const idRecipe = state[0][id];
    history.push(`/${type}/${idRecipe}`);
  };

  useEffect(() => {
    if (drinks && drinks.length === 1) {
      redirectToFirstCard('drinks', 'idDrink', drinks);
    }
    if (foods && foods.length === 1) {
      redirectToFirstCard('foods', 'idMeal', foods);
    }
  }, [foods, drinks]);

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
