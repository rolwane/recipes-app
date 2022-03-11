import React, { useEffect, useState } from 'react';
import { getAreasFoods, getFoodsByArea } from '../../services/foodsAPI';
import { MAX_FOODS_AND_DRINKS } from '../../helpers/constants';

// import components
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RepiceCard/RecipeCard';

function FoodNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [selectedNationality, setselectedNationality] = useState('American');
  const [foodNationality, setfoodNationality] = useState([]);

  useEffect(() => {
    getAreasFoods().then(({ meals }) => {
      const filterMap = meals.map(({ strArea }) => strArea);
      const filterNationalities = filterMap
        .filter((food, index) => filterMap.indexOf(food) === index);
      setNationalities(filterNationalities);
    });
  }, []);

  console.log(foodNationality);

  useEffect(() => {
    getFoodsByArea(selectedNationality).then(({ meals }) => setfoodNationality(meals));
  }, [selectedNationality]);

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
            // data-testid={ `${item}-option` }
            value={ item }
          >
            {item}
          </option>))}
      </select>
      <section>
        {foodNationality.map((food, index) => (index < MAX_FOODS_AND_DRINKS && (
          <RecipeCard
            key={ food.idMeal }
            image={ food.strMealThumb }
            name={ food.strMeal }
            index={ food.index }
          />
        )))}
      </section>
      <Footer />
    </section>
  );
}

export default FoodNationalities;

// Referência : https://pt.stackoverflow.com/questions/16483/remover-elementos-repetido-dentro-de-um-array-em-javascript;
