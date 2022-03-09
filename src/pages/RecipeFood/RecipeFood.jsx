import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import RecipeContext from '../../context/RecipeContext';
import { getFoodsById } from '../../services/foodsAPI';
import { favoriteRecipes, desfavoriteRecipes } from '../../helpers/functions';

// import { MAX_LENGTH_RECOMMENDS } from '../../helpers/constants';

// import components
import Button from '../../components/Button/Button';
// import RecipeCard from '../../components/RepiceCard/RecipeCard';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function RecipeFood(props) {
  const { match: { params: { id } } } = props;
  // const { drinksRecipe } = useContext(RecipeContext);

  const [recipeFood, setRecipeFood] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measurents, setMeasurents] = useState([]);
  // const [recommends, setRecommends] = useState([]);

  const {
    strMeal, strCategory, strInstructions, strMealThumb, strYoutube, strArea,
  } = recipeFood;

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const verifieDoneRecipe = doneRecipes && doneRecipes
    .some((recipe) => recipe.name === strMeal);

  const favoritedsRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const verifieFavoriteRecipe = favoritedsRecipes && doneRecipes
    .some((recipe) => recipe.name === strMeal);

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const verifieInProgressRecipe = inProgressRecipes
  && inProgressRecipes.some((recipe) => recipe.name === strMeal);

  const isFavorite = () => {
    if (verifieFavoriteRecipe) {
      return blackHeartIcon;
    }
    return whiteHeartIcon;
  };

  const handleFavoriteBtn = () => {
    const recipe = {
      id,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };

    if (verifieFavoriteRecipe) {
      desfavoriteRecipes(recipe);
      return;
    }

    favoriteRecipes(recipe);
  };

  useEffect(() => {
    getFoodsById(id).then((response) => setRecipeFood(response.meals[0]));
    // setRecommends(drinksRecipe.slice(0, MAX_LENGTH_RECOMMENDS));
  }, [id]);

  const getIngredients = () => {
    const recipeFoodArray = Object.entries(recipeFood);

    const ingredientesMap = recipeFoodArray.map((key) => {
      if (!key[0].includes('Ingredient')) {
        return null;
      }
      return key[1];
    }).filter((ingrediente) => ingrediente !== null);

    const ingredientsFilter = ingredientesMap.filter((ingrediente) => ingrediente !== '');
    return ingredientsFilter;
  };

  const getMeasure = () => {
    const recipeFoodArray = Object.entries(recipeFood);
    const measureMap = recipeFoodArray.map((key) => {
      if (!key[0].includes('Measure')) {
        return null;
      }
      return key[1];
    }).filter((medida) => medida !== null);
    const measureFilter = measureMap.filter((medida) => medida !== '');
    return measureFilter;
  };

  useEffect(() => {
    if (recipeFood) {
      setIngredients(getIngredients());
      setMeasurents(getMeasure());
    }
  }, []);

  return (
    <section>
      { recipeFood && (
        <>
          <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
          <div>
            <h3 data-testid="recipe-title">{ strMeal }</h3>
            <Button
              value={ <img src={ shareIcon } alt="share icon" /> }
              testId="share-btn"
            />
            <Button
              value={ <img src={ isFavorite() } alt="favorite icon" /> }
              testId="favorite-btn"
              onClick={ handleFavoriteBtn }
            />
          </div>
          <h4 data-testid="recipe-category">{ strCategory }</h4>
          <div>
            <h4>Ingredients</h4>
            <p>
              { measurents.map((medida, index) => (
                <span
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { medida }
                </span>
              ))}
              { ingredients.map((ingrediente, index) => (
                <span
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { ingrediente }
                </span>
              )) }
            </p>
          </div>
          <div>
            <h4>Instructions</h4>
            <p data-testid="instructions">{ strInstructions }</p>
          </div>
          <div>
            <h4>Video</h4>
            <video
              data-testid="video"
            >
              <source src={ strYoutube } type="video/mp4" />
              <source src={ strYoutube } type="video/ogg" />
              <track kind="captions" />
            </video>
          </div>
          <div>
            <h4>Recommend</h4>
            {/* { recommends.map((recipe, index) => (
          <Link to={ `/drinks/${recipe.idDrink}` } key={ index }>
            <RecipeCard
              index={ index }
              name={ recipe.strDrink }
              image={ recipe.strDrinkThumb }
            />
          </Link>
        ))} */}
          </div>
          { verifieDoneRecipe && (
            <Button
              value={ verifieInProgressRecipe ? 'Continue Recipes' : 'Start Recipe' }
              testId="share-btnstart-recipe-btn"
            />
          )}
        </>
      )}
    </section>
  );
}

RecipeFood.propTypes = {
  id: propTypes.number,
}.isRequired;

export default RecipeFood;
