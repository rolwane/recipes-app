/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';

// imported components
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RepiceCard/RecipeCard';

function Foods(props) {
  const { setRouteProps, foodList } = useContext(RecipeContext);

  useEffect(() => {
    setRouteProps(props);
  }, []);

  return (
    <section>
      <Header title="Foods" renderSearch />
      <div>
        {foodList.map((food, index) => (<RecipeCard
          key={ food.strMeal }
          image={ food.strMealThumb }
          name={ food.strMeal }
          index={ index }
        />))}
      </div>
    </section>
  );
}

export default Foods;
