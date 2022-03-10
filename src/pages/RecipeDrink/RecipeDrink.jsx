import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/RecipeContext';
import { getDrinksById } from '../../services/drinksAPI';
import {
  favoriteRecipes, desfavoriteRecipes, isFavorite, getIngredients, getMeasure,
  isInProgress, isDone, verifiedIconFavorite, shareLink,
} from '../../helpers/functions';
import './RecipeDrink.css';

// import components
import Button from '../../components/Button/Button';
import RecomendationCard from '../../components/RecomendationCard/RecomendationCard';
import shareIcon from '../../images/shareIcon.svg';

function RecipeDrink(props) {
  const { match: { params: { id } }, history } = props;
  const { recomendsFoods } = useContext(RecipeContext);
  const actualUrl = window.location.href;

  const [recipeDrink, setRecipeDrink] = useState([]);
  const {
    strDrink, strCategory, strInstructions,
    strDrinkThumb, strArea, strAlcoholic,
  } = recipeDrink;

  const [ingredients, setIngredients] = useState([]);
  const [measurents, setMeasurents] = useState([]);
  const [clickFavorite, setClickFavorite] = useState(1);
  const [isfavorited, setIsFavorited] = useState(isFavorite(strDrink));
  const [linkCopied, setLinkCopied] = useState(false);

  const handleFavoriteBtn = () => {
    const recipe = {
      id,
      type: 'drink',
      nationality: strArea || '',
      category: strCategory || '',
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

  const handleStartBtn = () => {
    history.push(`/drinks/${id}/in-progress`);
  };

  useEffect(() => {
    getDrinksById(id).then((response) => setRecipeDrink(response.drinks[0]));
  }, []);

  useEffect(() => {
    setIngredients(getIngredients(recipeDrink));
    setMeasurents(getMeasure(recipeDrink));
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
            <button type="button" onClick={ () => shareLink(actualUrl, setLinkCopied) }>
              <img data-testid="share-btn" src={ shareIcon } alt="share icon" />
              { linkCopied && <span>Link copied!</span> }
            </button>
            <Button
              title={
                <img
                  src={ verifiedIconFavorite(isfavorited) }
                  data-testid="favorite-btn"
                  alt="favorite icon"
                />
              }
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
          onClick={ handleStartBtn }
        >
          { isInProgress(id, 'cocktails') ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      )}
    </section>
  );
}

RecipeDrink.propTypes = {
  id: propTypes.number,
}.isRequired;

export default RecipeDrink;
