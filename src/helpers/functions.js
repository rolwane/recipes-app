import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export const favoriteRecipes = (recipe) => {
  const getFavoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favoriteRecipe = getFavoritesRecipes
    ? [...getFavoritesRecipes, recipe] : [recipe];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
};

export const desfavoriteRecipes = (recipe) => {
  const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const desfavorite = favoritesRecipes.filter((rec) => rec.name !== recipe.name);
  localStorage.setItem('favoriteRecipes', JSON.stringify(desfavorite));
};

export const isFavorite = (recipeName) => {
  const favoritedsRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const verifieFavoriteRecipe = favoritedsRecipes !== null ? favoritedsRecipes
    .some((recipe) => recipe.name === recipeName) : false;
  return verifieFavoriteRecipe;
};

export const isDone = (recipeName) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const verifieDoneRecipe = doneRecipes !== null && doneRecipes
    .some((recipe) => recipe.name === recipeName);
  return verifieDoneRecipe;
};

export const isInProgress = (recipeName) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const verifieInProgressRecipe = inProgressRecipes
  && inProgressRecipes.some((recipe) => recipe.name === recipeName);
  return verifieInProgressRecipe;
};

export const verifiedIconFavorite = (verifeFavorite) => {
  if (verifeFavorite) {
    return blackHeartIcon;
  }
  return whiteHeartIcon;
};
