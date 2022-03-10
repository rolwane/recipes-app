import React, { useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import './FoodInProgress.css';

//  Context
import RecipeContext from '../../context/RecipeContext';

function FoodInProgress(props) {
  const [recipeInProgress, setRecipeInProgress] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [localStorage, setLocalStorage] = useState([]);
  const { match: { params } } = props;
  const { foodList } = useContext(RecipeContext); // um state se for drink ou food.

  useEffect(() => {
    const food = foodList.find((recipe) => (
      recipe.idMeal
      || recipe.idDrink
    ) === params.id) || {};
    setRecipeInProgress(food);
  }, [foodList, params]);

  useEffect(() => {
    const list = Object.entries(recipeInProgress)
      .filter((e) => e[0].includes('strIngredient') || e[0].includes('strMeasure'));

    const newList = Object.fromEntries(list);
    Object.keys(newList).forEach((e) => {
      if (newList[e].length <= 1) delete newList[e];
    });
    const ingredients = Object.entries(newList)
      .filter((e) => e[0].includes('strIngredient'));
    setIngredientList(ingredients);
    const measures = Object.entries(newList)
      .filter((e) => e[0].includes('strMeasure'));
    setMeasureList(measures);
  }, [recipeInProgress]); // retira apenas as chaves strIngredient e strMeasure que possuem valores do Objeto.

  const handleClick = ({ target }) => {
    console.log(target);
    // target.nextElementSibling.classList.toggle('line-through');
    setLocalStorage((prevState) => ([...prevState, target.id]));
    localStorage.setItem('list');
  };

  return (
    <section>
      <img
        src={ recipeInProgress.strMealThumb }
        alt={ recipeInProgress.strMeal }
        width="300px"
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{ recipeInProgress.strMeal }</h3>
      <button type="button" data-testid="share-btn">
        <img
          src="https://img.icons8.com/android/24/000000/share.png"
          alt="será um componente"
        />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img
          style={ { width: '24.2px' } }
          src="https://img.icons8.com/emoji/48/000000/heart-suit.png"
          alt="será um componente"
        />
      </button>
      <h4 data-testid="recipe-category">
        { recipeInProgress.strCategory }
      </h4>
      <ul>
        { ingredientList.map((ingredient, i) => (
          <li key={ i } data-testid={ `${i}-ingredient-step` }>
            <input
              type="checkbox"
              id={ ingredient[1] }
              name={ ingredient[0] }
              value={ ingredient[1] }
              onChange={ handleClick }
            />
            <label htmlFor={ ingredient[1] }>
              {ingredient[1]}
              :
              {' '}
              {measureList[i][1]}
            </label>

          </li>))}
      </ul>
      <p data-testid="instructions">
        { recipeInProgress.strInstructions }
      </p>
      <button type="button" data-testid="finish-recipe-btn">FINISH RECIPE</button>
    </section>
  );
}

FoodInProgress.propTypes = {
  params: propTypes.object,
}.isRequired;

export default FoodInProgress;
