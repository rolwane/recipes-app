import React, { useEffect, useState } from 'react';
import { getAreasFoods, getFoodsByArea, getFoods } from '../../services/foodsAPI';
import { MAX_FOODS_AND_DRINKS } from '../../helpers/constants';

// import components
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
// import RecipeCard from '../../components/RepiceCard/RecipeCard';

function FoodNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [reloadRecipes, setReloadRecipes] = useState(false);
  const [selectedNationality, setselectedNationality] = useState('');
  const [foodNationality, setFoodNationality] = useState([]);

  useEffect(() => {
    getAreasFoods().then(({ meals }) => {
      const filterMap = meals.map(({ strArea }) => strArea);
      const filterNationalities = filterMap
        .filter((food, index) => filterMap.indexOf(food) === index);
      setNationalities(['All', ...filterNationalities]);
    });
  }, []);

  useEffect(() => {
    if (selectedNationality) {
      if (selectedNationality === 'All') {
        setReloadRecipes(!reloadRecipes);
        return;
      }
      getFoodsByArea(selectedNationality).then(({ meals }) => setFoodNationality(meals));
    }
  }, [selectedNationality]);

  useEffect(() => {
    getFoods().then(({ meals }) => setFoodNationality(meals));
  }, [reloadRecipes]);

  return (
    <section>
      <Header title="Explore Nationalities" renderSearch />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target: { value } }) => setselectedNationality(value) }
      >
        {nationalities.map((item) => (

          <option
            key={ item }
            data-testid={ `${item}-option` }
            value={ item }
          >
            {item}
          </option>))}
      </select>
      <section>
        {foodNationality.map((food, index) => (index < MAX_FOODS_AND_DRINKS && (
          <a
            style={ { display: 'flex', flexDirection: 'column', height: 'fit-content' } }
            href={ `/foods/${food.idMeal}` }
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <img
              src={ food.strMealThumb }
              alt="recipe"
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>{food.strMeal}</h3>
          </a>
        )))}
      </section>
      <Footer />
    </section>
  );
}

export default FoodNationalities;

// Referência : https://pt.stackoverflow.com/questions/16483/remover-elementos-repetido-dentro-de-um-array-em-javascript;
