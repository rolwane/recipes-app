import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/RecipeContext';
import { getDrinksById } from '../../services/drinksAPI';
import {
  favoriteRecipes, desfavoriteRecipes, isFavorite,
  isInProgress, isDone, verifiedIconFavorite,
} from '../../helpers/functions';
import './RecipeDrink.css';

// import components
import Button from '../../components/Button/Button';
import RecomendationCard from '../../components/RecomendationCard/RecomendationCard';
import shareIcon from '../../images/shareIcon.svg';

function RecipeDrink(props) {
  const { match: { params: { id } } } = props;
  const { recomendsFoods } = useContext(RecipeContext);

  const [recipeDrink, setRecipeDrink] = useState([]);
  const {
    strDrink, strCategory, strInstructions, strDrinkThumb, strArea, strAlcoholic,
  } = recipeDrink;

  const [ingredients, setIngredients] = useState([]);
  const [measurents, setMeasurents] = useState([]);
  const [clickFavorite, setClickFavorite] = useState(1);
  const [isfavorited, setIsFavorited] = useState(isFavorite(strDrink));

  const handleFavoriteBtn = () => {
    const recipe = {
      id,
      type: 'drink',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strDrink,
      image: strDrinkThumb,
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
    getDrinksById(id).then((response) => setRecipeDrink(response.drinks[0]));
  }, []);

  const getIngredients = () => {
    const recipeDrinkArray = Object.entries(recipeDrink);

    const ingredientesMap = recipeDrinkArray.map((key) => {
      if (!key[0].includes('Ingredient')) {
        return null;
      }
      return key[1];
    }).filter((ingrediente) => ingrediente !== null);

    const ingredientsFilter = ingredientesMap.filter((ingrediente) => ingrediente !== '');
    return ingredientsFilter;
  };

  const getMeasure = () => {
    const recipeDrinkArray = Object.entries(recipeDrink);
    const measureMap = recipeDrinkArray.map((key) => {
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
    setIsFavorited(isFavorite(strDrink));
  }, [recipeDrink, clickFavorite]);

  return (
    <section className="content">
      { recipeDrink && (
        <>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            className="recipe-photo"
            data-testid="recipe-photo"
          />
          <div>
            <h3 data-testid="recipe-title">{ strDrink }</h3>
            <Button
              title={ <img src={ shareIcon } alt="share icon" /> }
              testId="share-btn"
            />
            <Button
              title={
                <img
                  src={ verifiedIconFavorite(isfavorited) }
                  alt="favorite icon"
                />
              }
              testId="favorite-btn"
              onClick={ handleFavoriteBtn }
            />
          </div>
          <h4 data-testid="recipe-category">{ strAlcoholic }</h4>
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
          <div className="div-recomends">
            <h4>Recommend</h4>
            <section className="section-cardsRecomend">
              { recomendsFoods && recomendsFoods.map((recipe, index) => (
                <Link
                  key={ index }
                  to={ `/drinks/${recipe.idMeal}` }
                >
                  <RecomendationCard
                    index={ index }
                    name={ recipe.strMeal }
                    image={ recipe.strMealThumb }
                  />
                </Link>
              ))}
            </section>
          </div>
        </>
      )}
      { !isDone(strDrink) && (
        <button
          type="button"
          className="btn-start"
          data-testid="start-recipe-btn"
        >
          { isInProgress(strDrink) ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      )}
    </section>
  );
}

RecipeDrink.propTypes = {
  id: propTypes.number,
}.isRequired;

export default RecipeDrink;
