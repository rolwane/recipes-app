export const getFoodsBySearchBar = async (searchValue, filter) => {
  const query = filter !== 'i' ? 'search' : 'filter';
  const url = `https://www.themealdb.com/api/json/v1/1/${query}.php?${filter}=${searchValue}`;
  const data = await (await fetch(url)).json();

  return data;
};

export const getFoodsById = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await (await fetch(url)).json();

  return data;
};
