import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAreasFoods, getFoodsByArea, getFoods } from '../../services/foodsAPI';
import { MAX_FOODS_AND_DRINKS } from '../../helpers/constants';

// import components
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RepiceCard/RecipeCard';
import RecipeContext from '../../context/RecipeContext';

function FoodNationalities() {
  const { foodsRecipe } = useContext(RecipeContext);
  const [nationalities, setNationalities] = useState([]);
  const [selectedNationality, setselectedNationality] = useState('');
  const [foodNationality, setFoodNationality] = useState(foodsRecipe);

  useEffect(() => {
    getAreasFoods().then(({ meals }) => {
      const filterMap = meals.map(({ strArea }) => strArea);
      const filterNationalities = filterMap
        .filter((food, index) => filterMap.indexOf(food) === index);
      setNationalities(filterNationalities);
      // setselectedNationality(filterNationalities[0]);
    });
  }, []);

  console.log(foodNationality);

  useEffect(() => {
    if (selectedNationality) {
      getFoodsByArea(selectedNationality).then(({ meals }) => setFoodNationality(meals));
    }
  }, [selectedNationality]);

  useEffect(() => {
    getFoods().then(({ meals }) => setFoodNationality(meals));
  }, []);

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
          <Link
            to={ `/foods/${food.idMeal}` }
            // data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <RecipeCard
              key={ food.idMeal }
              image={ food.strMealThumb }
              name={ food.strMeal }
              index={ index }
            />
          </Link>
        )))}
      </section>
      <Footer />
    </section>
  );
}

export default FoodNationalities;

// Referência : https://pt.stackoverflow.com/questions/16483/remover-elementos-repetido-dentro-de-um-array-em-javascript;
