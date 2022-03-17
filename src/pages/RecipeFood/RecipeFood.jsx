import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GiShare } from 'react-icons/gi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import RecipeContext from '../../context/RecipeContext';
import { getFoodsById } from '../../services/foodsAPI';
import {
  favoriteRecipes, desfavoriteRecipes, isFavorite, verifiedIconFavorite,
  isInProgress, isDone, shareLink, getIngredients, getMeasure,
} from '../../helpers/functions';
import './RecipeFood.css';

// import components
import Button from '../../components/Button/Button';
import RecomendationCard from '../../components/RecomendationCard/RecomendationCard';

function RecipeFood(props) {
  const { match: { params: { id } }, history } = props;
  const { recomendsDrinks } = useContext(RecipeContext);
  const actualUrl = window.location.href;

  const [recipeFood, setRecipeFood] = useState([]);
  const {
    strMeal, strCategory, strInstructions, strMealThumb, strYoutube, strArea,
  } = recipeFood;

  const [ingredients, setIngredients] = useState([]);
  const [measurents, setMeasurents] = useState([]);
  const [clickFavorite, setClickFavorite] = useState(1);
  const [isfavorited, setIsFavorited] = useState(isFavorite(strMeal));
  const [linkCopied, setLinkCopied] = useState(false);

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

  const handleStartBtn = () => {
    history.push(`/foods/${id}/in-progress`);
  };

  useEffect(() => {
    getFoodsById(id).then((response) => setRecipeFood(response.meals[0]));
  }, []);

  useEffect(() => {
    setIngredients(getIngredients(recipeFood));
    setMeasurents(getMeasure(recipeFood));
    setIsFavorited(isFavorite(strMeal));
  }, [recipeFood, clickFavorite]);

  return (
    <section>
      <Button
        type="button"
        onClick={ () => history.goBack() }
        className="back-button"
      >
        <IoMdArrowRoundBack />
      </Button>

      { recipeFood && (
        <>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid="recipe-photo"
            className="recipe-photo"
          />

          <div className="container-infos">
            <h3 data-testid="recipe-title" className="recipe-title">{ strMeal }</h3>

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
                  data-testid="favorite-btn"
                  src={ verifiedIconFavorite(isfavorited) }
                  alt="favorite icon"
                />
              </Button>
            </div>
          </div>

          <h4
            data-testid="recipe-category"
            className="recipe-category"
          >
            { strCategory }
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

          <div>
            <h4 className="video-title">Video</h4>
            <iframe
              data-testid="video"
              className="recipe-video"
              height="315"
              src={ `https://www.youtube.com/embed/${idYoutube || ''}` }
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
          </div>

          <div className="container-recommends">
            <h4 className="video-title">Recommend</h4>
            <section className="cards-recommends">
              { recomendsDrinks && recomendsDrinks.map((recipe, index) => (
                <Link
                  key={ index }
                  to={ `/drinks/${recipe.idDrink}` }
                  style={ { textDecoration: 'none' } }
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
          onClick={ handleStartBtn }
        >
          { isInProgress(id, 'meals') ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      )}

    </section>
  );
}

RecipeFood.propTypes = {
  id: propTypes.number,
}.isRequired;

export default RecipeFood;
