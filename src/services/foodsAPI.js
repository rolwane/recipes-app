export const getFoodsBySearchBar = async (searchValue, filter) => {
  const query = filter !== 'i' ? 'search' : 'filter';
  const url = `https://www.themealdb.com/api/json/v1/1/${query}.php?${filter}=${searchValue}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getTwelvesFoods = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const data = await (await fetch(url)).json();

  return data;
};

export const getCategoriesFoods = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const data = await (await fetch(url)).json();

  return data;
};

export const getFoodsByCategory = async (category) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const data = await (await fetch(url)).json();

  return data;
};

export const getFoodsById = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await (await fetch(url)).json();

  return data;
};
