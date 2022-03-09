/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/RecipeContext';
import { getCategorysDrinks } from '../../services/drinksAPI';
import { MAX_CATEGORYS } from '../../helpers/constants';

// imported components
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RepiceCard/RecipeCard';
import Button from '../../components/Button/Button';

function Drinks(props) {
  const { setRouteProps, drinksRecipe } = useContext(RecipeContext);
  const [categorysDrinks, setCategoryDrinks] = useState([]);

  useEffect(() => {
    setRouteProps(props);
    getCategorysDrinks()
      .then((response) => setCategoryDrinks(response.drinks.slice(0, MAX_CATEGORYS)));
  }, []);

  return (
    <section>
      <Header title="Drinks" renderSearch />
      <article>
        { categorysDrinks && categorysDrinks.map(({ strCategory }) => (
          <Button
            key={ strCategory }
            title={ strCategory }
            testId={ `${strCategory}-category-filter` }
          />
        ))}
      </article>
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
