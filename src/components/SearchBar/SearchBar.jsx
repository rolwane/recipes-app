import React, { useState, useContext } from 'react';
import RepiceContext from '../../context/RecipeContext';
import { getFoodsBySearchBar } from '../../services/foodsAPI';
import { getDrinksBySearchBar } from '../../services/drinksAPI';

// imported components
import Input from '../Input/Input';

function SearchBar() {
  const { routeProps } = useContext(RepiceContext);
  const [search, setSearch] = useState('');
  const [searchFilter, setsearchFilter] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const { match: { path } } = routeProps;

    if (searchFilter === 'f' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    if (path.includes('/drinks')) {
      getDrinksBySearchBar(search, searchFilter).then((data) => console.log(data));
      return;
    }

    getFoodsBySearchBar(search, searchFilter).then((data) => console.log(data));
  };

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
