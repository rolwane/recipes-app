/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/RecipeContext';
import RecipeCard from '../../components/RepiceCard/RecipeCard';

// imported components
import Header from '../../components/Header/Header';

function Drinks(props) {
  const { setRouteProps, drinksRecipe } = useContext(RecipeContext);

  useEffect(() => {
    setRouteProps(props);
  }, []);

  return (
    <section>
      <Header title="Drinks" renderSearch />
      <section>
        { drinksRecipe.map((drink, index) => (
          <Link key={ index } to="/foods">
            <RecipeCard
              image={ drink.strDrinkThumb }
              name={ drink.strDrink }
              index={ index }
            />
          </Link>
        ))}
      </section>
    </section>
  );
}

export default Drinks;
