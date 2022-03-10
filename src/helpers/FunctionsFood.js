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
