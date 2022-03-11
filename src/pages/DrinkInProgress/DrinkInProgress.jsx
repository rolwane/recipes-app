import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
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
    if (savedDrinkLS) {
      const ingredients = savedDrinkLS.cocktails[params.id];
      setCheckIngredients(ingredients);
    }
    getDrinksById(params.id).then((e) => setRecipeInProgress(e.drinks[0]));
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
    history.push('/done-recipes');
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
            width="300px"
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{ recipeInProgress.strDrink }</h3>
          <Button type="button" onClick={ handleShareClick }>
            <img
              data-testid="share-btn"
              src="https://img.icons8.com/android/24/000000/share.png"
              alt="será um componente"
            />
            {shareLinkMsg && <p>Link copied!</p>}
          </Button>
          <Button
            type="button"
            onClick={ handleFavoriteClick }
          >
            <img
              data-testid="favorite-btn"
              style={ { width: '24.2px' } }
              src={ verifiedIconFavorite(isFavoriteRecipe) }
              alt="será um componente"
            />
          </Button>
          <h4 data-testid="recipe-category">
            { recipeInProgress.strCategory }
          </h4>
          <ul>
            { ingredientList.map((ingredient, i) => (
              <li key={ i } data-testid={ `${i}-ingredient-step` }>
                <input
                  checked={ checkedIngredients
                    && checkedIngredients.some((ing) => ing.includes(ingredient[1])) }
                  type="checkbox"
                  id={ ingredient[1] }
                  name={ ingredient[0] }
                  value={ ingredient[1] }
                  onChange={ handleOnChange }
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
          <p data-testid="instructions">
            { recipeInProgress.strInstructions }
          </p>
          <button
            disabled={ checkedIngredients
              && ingredientList.length !== checkedIngredients.length }
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ handleClick }
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
