export const getDrinksBySearchBar = async (searchValue, filter) => {
  const query = filter !== 'i' ? 'search' : 'filter';
  const url = `https://www.thecocktaildb.com/api/json/v1/1/${query}.php?${filter}=${searchValue}`;
  const data = await (await fetch(url)).json();

  return data;
};

export const TEMP = 'TEMP';
