import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { GiShare } from 'react-icons/gi';
import { REMOVE_IN_PROGRESS } from '../../helpers/constants';
import { sendProgressRecipe,
  shareLink,
  favoriteRecipes,
  isFavorite,
  desfavoriteRecipes,
  verifiedIconFavorite,
} from '../../helpers/functions';
import { getDrinksById } from '../../services/drinksAPI';
import Button from '../../components/Button/Button';

function DrinkInProgress(props) {
  const [recipeInProgress, setRecipeInProgress] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [checkedIngredients, setCheckIngredients] = useState([]);
  const [shareLinkMsg, setShareLinkMsg] = useState(false);
  const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);
  const [clickedFavorite, setClickedFavorite] = useState(0);
  const { match: { params }, history } = props;

  useEffect(() => {
    setIsFavoriteRecipe(isFavorite(recipeInProgress.strMeal));
    const savedDrinkLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    getDrinksById(params.id).then((e) => setRecipeInProgress(e.drinks[0]));
    if (savedDrinkLS) {
      const ingredients = savedDrinkLS.cocktails[params.id];
      if (ingredients) {
        setCheckIngredients(ingredients);
      }
      return;
    }
    setCheckIngredients([]);
  }, [params.id]);

  useEffect(() => {
    setIsFavoriteRecipe(isFavorite(recipeInProgress.strDrink));
  }, [clickedFavorite, recipeInProgress.strDrink]);

  useEffect(() => {
    const recipe = { [params.id]: checkedIngredients };
    sendProgressRecipe('cocktails', recipe);
  }, [checkedIngredients, params.id]);

  useEffect(() => {
    const list = Object.entries(recipeInProgress)
      .filter((e) => e[0].includes('strIngredient') || e[0].includes('strMeasure'));

    const newList = Object.fromEntries(list);
    Object.keys(newList).forEach((e) => {
      if (newList[e] === null || newList[e] === '') delete newList[e];
    });
    const ingredients = Object.entries(newList)
      .filter((e) => e[0].includes('strIngredient'));
    setIngredientList(ingredients);
    const measures = Object.entries(newList)
      .filter((e) => e[0].includes('strMeasure'));
    setMeasureList(measures);
  }, [recipeInProgress]); // retira apenas as chaves strIngredient e strMeasure que possuem valores do Objeto.

  const handleOnChange = ({ target }) => {
    const ingredients = target.nextElementSibling.innerText;
    if (checkedIngredients.some((ing) => ing === ingredients)) {
      setCheckIngredients((prevState) => prevState.filter((ing) => ing !== ingredients));
      return;
    }
    setCheckIngredients((prevState) => [...prevState, ingredients]);
  };

  const handleClick = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const actualDate = `${day}/${month}/${year}`;

    const recipe = {
      id: params.id,
      type: 'drink',
      nationality: recipeInProgress.strDrink || '',
      category: recipeInProgress.strCategory || '',
      alcoholicOrNot: recipeInProgress.strAlcoholic || '',
      name: recipeInProgress.strDrink,
      image: recipeInProgress.strDrinkThumb,
      doneDate: actualDate,
      tags: recipeInProgress.strTags ? recipeInProgress.strTags.split(',') : '',
    };

    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const getInProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    const sendDoneRecipe = getDoneRecipes !== null
      ? [...getDoneRecipes, recipe] : [recipe];

    history.push('/done-recipes');
    localStorage.setItem('doneRecipes', JSON.stringify(sendDoneRecipe));
    delete getInProgressRecipes.cocktails[params.id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(getInProgressRecipes));
  };
  const handleShareClick = () => {
    const link = window.location.href;
    shareLink(link.slice(0, REMOVE_IN_PROGRESS), setShareLinkMsg);
  };

  const handleFavoriteClick = () => {
    const recipe = {
      id: recipeInProgress.idDrink,
      name: recipeInProgress.strDrink,
      type: 'drink',
      nationality: recipeInProgress.strArea || '',
      category: recipeInProgress.strCategory || '',
      alcoholicOrNot: recipeInProgress.strAlcoholic || '',
      image: recipeInProgress.strDrinkThumb,
    };

    if (isFavoriteRecipe) {
      desfavoriteRecipes(recipe);
      setClickedFavorite((prevState) => prevState + 1);
      return;
    }
    favoriteRecipes(recipe);
    setClickedFavorite((prevState) => prevState + 1);
  };

  return (
    <section>
      { recipeInProgress && (
        <>
          <img
            src={ recipeInProgress.strDrinkThumb }
            alt={ recipeInProgress.strDrink }
            data-testid="recipe-photo"
            className="recipe-photo"
          />

          <h3 className="recipe-title">{ recipeInProgress.strDrink }</h3>

          <div className="container-recipe-buttons">
            <Button type="button" onClick={ handleShareClick }>
              {
                (shareLinkMsg && <span className="span">Link copied!</span>)
                || <GiShare className="share-icon" />

              }
            </Button>

            <Button
              onClick={ handleFavoriteClick }
            >
              <img
                data-testid="favorite-btn"
                src={ verifiedIconFavorite(isFavoriteRecipe) }
                alt="favorite icon"
              />
            </Button>
          </div>

          <h4
            data-testid="recipe-category"
            className="recipe-category"
          >
            { recipeInProgress.strCategory }
          </h4>

          <ul className="ingredients-list">
            { ingredientList.map((ingredient, i) => (

              <li
                key={ i }
                data-testid={ `${i}-ingredient-step` }
                className="ingredient-item"
              >
                <input
                  checked={ checkedIngredients
                    && checkedIngredients.some((ing) => ing.includes(ingredient[1])) }
                  type="checkbox"
                  id={ ingredient[1] }
                  name={ ingredient[0] }
                  value={ ingredient[1] }
                  onChange={ handleOnChange }
                  className="checkbox-item"
                />
                <label
                  htmlFor={ ingredient[1] }
                  className={
                    checkedIngredients
                  && checkedIngredients.some((ing) => ing.includes(ingredient[1]))
                      ? 'line-through' : ''
                  }
                >
                  { ingredient[1] }
                  { measureList[i] && `: ${measureList[i][1]}` }
                </label>

              </li>))}
          </ul>

          <p data-testid="instructions" className="container-instructions">
            <p className="instructions">
              { recipeInProgress.strInstructions }
            </p>
          </p>

          <button
            disabled={ checkedIngredients
              && ingredientList.length !== checkedIngredients.length }
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ handleClick }
            className="finish-recipe-btn"
          >
            FINISH RECIPE
          </button>
        </>
      )}
    </section>
  );
}

DrinkInProgress.propTypes = {
  params: propTypes.object,
}.isRequired;

export default DrinkInProgress;
