/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/RecipeContext';
import { getCategorysFoods } from '../../services/foodsAPI';
import { MAX_CATEGORYS } from '../../helpers/constants';

// imported components
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RepiceCard/RecipeCard';
import Button from '../../components/Button/Button';

function Foods(props) {
  const { setRouteProps, foodsRecipe } = useContext(RecipeContext);
  const [categorysFoods, setCategoryFoods] = useState([]);

  useEffect(() => {
    setRouteProps(props);
    getCategorysFoods()
      .then((response) => setCategoryFoods(response.meals.slice(0, MAX_CATEGORYS)));
  }, []);

  return (
    <section>
      <Header title="Foods" renderSearch />
      <article>
        { categorysFoods && categorysFoods.map(({ strCategory }) => (
          <Button
            key={ strCategory }
            title={ strCategory }
            testId={ `${strCategory}-category-filter` }
          />
        ))}
      </article>
      <section>
        { foodsRecipe.map((food, index) => (
          <Link key={ index } to="/foods">
            <RecipeCard
              image={ food.strMealThumb }
              name={ food.strMeal }
              index={ index }
            />
          </Link>
        ))}
      </section>
    </section>
  );
}

export default Foods;
