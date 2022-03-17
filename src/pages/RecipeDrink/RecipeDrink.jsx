import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GiShare } from 'react-icons/gi';
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
      <Button
        type="button"
        onClick={ () => history.goBack() }
        className="back-button"
      >
        <IoMdArrowRoundBack />
      </Button>
      { recipeDrink && (
        <>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            className="recipe-photo"
            data-testid="recipe-photo"
          />
          <div className="container-infos">
            <h3 data-testid="recipe-title" className="recipe-title">{ strDrink }</h3>

            <div className="container-recipe-buttons">
              <Button type="button" onClick={ () => shareLink(actualUrl, setLinkCopied) }>
                {
                  linkCopied
                    ? <span className="span">Link copied!</span>
                    : <GiShare className="share-icon" />
                }
              </Button>

              <Button
                onClick={ handleFavoriteBtn }
              >
                <img
                  src={ verifiedIconFavorite(isfavorited) }
                  data-testid="favorite-btn"
                  alt="favorite icon"
                />
              </Button>
            </div>

          </div>

          <h4
            data-testid="recipe-category"
            className="recipe-category"
          >
            { strAlcoholic }

          </h4>

          <div className="container-recipe-ingradients">
            <h4 className="ingredients-title">Ingredients</h4>

            { ingredients.map((ingrediente, index) => (
              <div key={ index } className="recipe-ingredient">
                <span>{ingrediente}</span>
                <span className="separator" />
                <span>{measurents[index]}</span>
              </div>
            )) }
          </div>

          <div className="container-instructions">
            <h4 className="instructions-title">Instructions</h4>
            <p data-testid="instructions" className="instructions">{ strInstructions }</p>
          </div>

          <div className="container-recommends">
            <h4 className="video-title">Recommend</h4>
            <section className="cards-recommends">
              { recomendsFoods && recomendsFoods.map((recipe, index) => (
                <Link
                  key={ index }
                  to={ `/foods/${recipe.idMeal}` }
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
