import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/RecipeContext';
import { getFoodsById } from '../../services/foodsAPI';
import {
  favoriteRecipes, desfavoriteRecipes, isFavorite, verifiedIconFavorite,
  isInProgress, isDone,
} from '../../helpers/functions';
import './RecipeFood.css';

// import components
import Button from '../../components/Button/Button';
import RecomendationCard from '../../components/RecomendationCard/RecomendationCard';
import shareIcon from '../../images/shareIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function RecipeFood(props) {
  const { match: { params: { id } } } = props;
  const { recomendsDrinks } = useContext(RecipeContext);

  const [recipeFood, setRecipeFood] = useState([]);
  const {
    strMeal, strCategory, strInstructions, strMealThumb, strYoutube, strArea,
  } = recipeFood;

  const [ingredients, setIngredients] = useState([]);
  const [measurents, setMeasurents] = useState([]);
  const [clickFavorite, setClickFavorite] = useState(1);
  const [isfavorited, setIsFavorited] = useState(isFavorite(strMeal));

  const idYoutube = strYoutube && strYoutube.split('=')[1];

  const handleFavoriteBtn = () => {
    const recipe = {
      id,
      type: 'food',
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: '',
      name: strMeal || '',
      image: strMealThumb || '',
    };

    if (isfavorited) {
      desfavoriteRecipes(recipe);
      setClickFavorite((prevState) => prevState + 1);
      return;
    }
    favoriteRecipes(recipe);
    setClickFavorite((prevState) => prevState + 1);
  };

  useEffect(() => {
    getFoodsById(id).then((response) => setRecipeFood(response.meals[0]));
  }, []);

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
    setIngredients(getIngredients());
    setMeasurents(getMeasure());
    setIsFavorited(isFavorite(strMeal));
  }, [recipeFood, clickFavorite]);

  return (
    <section className="content">
      { recipeFood && (
        <>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid="recipe-photo"
            className="recipe-photo"
          />
          <div>
            <h3 data-testid="recipe-title">{ strMeal }</h3>
            <Button
              title={ <img src={ shareIcon } alt="share icon" /> }
              testId="share-btn"
            />
            <Button
              title={
                <img
                  data-testid="favorite-btn"
                  src={ verifiedIconFavorite(isfavorited) }
                  alt="favorite icon"
                />
              }
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
            <iframe
              data-testid="video"
              className="videoRecipe"
              height="315"
              src={ `https://www.youtube.com/embed/${idYoutube || ''}` }
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className="div-recomends">
            <h4>Recommend</h4>
            <section className="section-cardsRecomend">
              { recomendsDrinks && recomendsDrinks.map((recipe, index) => (
                <Link
                  key={ index }
                  to={ `/drinks/${recipe.idDrink}` }
                >
                  <RecomendationCard
                    index={ index }
                    name={ recipe.strDrink }
                    image={ recipe.strDrinkThumb }
                  />
                </Link>
              ))}
            </section>
          </div>
        </>
      )}
      { !isDone(strMeal) && (
        <button
          type="button"
          className="btn-start"
          data-testid="start-recipe-btn"
        >
          { isInProgress(strMeal) ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      )}

    </section>
  );
}

RecipeFood.propTypes = {
  id: propTypes.number,
}.isRequired;

export default RecipeFood;
