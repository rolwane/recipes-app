/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/RecipeContext';

import { getCategoriesFoods, getFoodsByCategory } from '../../services/foodsAPI';
import { MAX_CATEGORIES, MAX_FOODS_AND_DRINKS } from '../../helpers/constants';

// imported components
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RepiceCard/RecipeCard';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';

function Foods(props) {
  const {
    setRouteProps,
    foodList,
    setFoodList,
    foodsRecipe,
  } = useContext(RecipeContext);

  const [categoriesFoods, setCategoryFoods] = useState([]);
  const [toggleFilter, setToggleFilter] = useState('');

  useEffect(() => {
    setRouteProps(props);

    getCategoriesFoods().then((response) => {
      setCategoryFoods([
        { strCategory: 'All' }, ...response.meals.slice(0, MAX_CATEGORIES),
      ]);
    });
  }, []);

  const handleButton = async (strCategory) => {
    if (toggleFilter === strCategory || strCategory === 'All') {
      setFoodList(foodsRecipe);
      setToggleFilter('');
      return;
    }

    const response = await getFoodsByCategory(strCategory);
    setFoodList(response.meals.slice(0, MAX_FOODS_AND_DRINKS));
    setToggleFilter(strCategory);
  };

  return (
    <section>
      <Header title="Foods" renderSearch />

      <article>
        { categoriesFoods.map(({ strCategory }) => (
          <Button
            key={ strCategory }
            title={ strCategory }
            testId={ `${strCategory}-category-filter` }
            onClick={ () => handleButton(strCategory) }
          />
        ))}
      </article>

      <section>
        { foodList.map((food, index) => (
          <Link key={ index } to={ `/foods/${food.idMeal}` }>
            <RecipeCard
              image={ food.strMealThumb }
              name={ food.strMeal }
              index={ index }
            />
          </Link>
        ))}
      </section>
      <Footer />
    </section>
  );
}

export default Foods;
