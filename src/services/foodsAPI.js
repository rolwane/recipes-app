export const getFoodsBySearchBar = async (searchValue, filter) => {
  const query = filter !== 'i' ? 'search' : 'filter';
  const url = `https://www.themealdb.com/api/json/v1/1/${query}.php?${filter}=${searchValue}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getFoods = async () => {
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

export const getRandomFood = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const data = await (await fetch(url)).json();
  return data;
};

export const getIngredientsFoods = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const data = await (await fetch(url)).json();
  return data;
};

export const getFoodsByIngredients = async (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const data = await (await fetch(url)).json();
  return data;
};

export const getAreasFoods = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const data = await (await fetch(url)).json();
  return data;
};

export const getFoodsByArea = async (area) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const data = await (await fetch(url)).json();
  return data;
};
