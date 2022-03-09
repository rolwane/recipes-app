export const favoriteRecipes = (recipe) => {
  const favoriteRecipe = [];
  favoriteRecipe.push(recipe);
  localStorage.getItem('favoritesRecipes', JSON.stringify(favoriteRecipe));
};

export const desfavoriteRecipes = (recipe) => {
  const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const desfavorite = favoritesRecipes.filter((rec) => rec !== recipe);
  localStorage.getItem('favoritesRecipes', JSON.stringify(desfavorite));
};
