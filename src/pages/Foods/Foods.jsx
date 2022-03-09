/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/RecipeContext';
import RecipeCard from '../../components/RepiceCard/RecipeCard';

// imported components
import Header from '../../components/Header/Header';

function Foods(props) {
  const { setRouteProps, foodsRecipe } = useContext(RecipeContext);

  useEffect(() => {
    setRouteProps(props);
  }, []);

  return (
    <section>
      <Header title="Foods" renderSearch />
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
