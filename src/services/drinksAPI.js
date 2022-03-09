export const getDrinksBySearchBar = async (searchValue, filter) => {
  const query = filter !== 'i' ? 'search' : 'filter';
  const url = `https://www.thecocktaildb.com/api/json/v1/1/${query}.php?${filter}=${searchValue}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const TEMP = 'TEMP';
