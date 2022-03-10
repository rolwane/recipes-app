import clipboardCopy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const SHOW_MESSAGE_COPIED = 3000;

export const getIngredients = (recipe) => {
  const recipeArray = Object.entries(recipe);

  const ingredientesMap = recipeArray.map((key) => {
    if (!key[0].includes('Ingredient')) {
      return null;
    }
    return key[1];
  }).filter((ingrediente) => ingrediente !== null);

  const ingredientsFilter = ingredientesMap.filter((ingrediente) => ingrediente !== '');
  return ingredientsFilter;
};

export const getMeasure = (recipe) => {
  const recipeArray = Object.entries(recipe);
  const measureMap = recipeArray.map((key) => {
    if (!key[0].includes('Measure')) {
      return null;
    }
    return key[1];
  }).filter((medida) => medida !== null);
  const measureFilter = measureMap.filter((medida) => medida !== '');
  return measureFilter;
};

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

export const isInProgress = (idRecipe, type) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const verifieInProgressRecipe = inProgressRecipes ? Object.keys(inProgressRecipes[type])
    .some((ids) => ids === idRecipe) : false;
  return verifieInProgressRecipe;
};

export const verifiedIconFavorite = (verifeFavorite) => {
  if (verifeFavorite) {
    return blackHeartIcon;
  }
  return whiteHeartIcon;
};

export const shareLink = (link, showMessage) => {
  clipboardCopy(link);
  showMessage(true);
  setTimeout(() => {
    showMessage(false);
  }, SHOW_MESSAGE_COPIED);
};
