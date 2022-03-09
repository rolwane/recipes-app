/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/RecipeContext';
import { getCategoriesDrinks, getDrinksByCategory } from '../../services/drinksAPI';
import { MAX_CATEGORIES, MAX_FOODS_AND_DRINKS } from '../../helpers/constants';

// imported components
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RepiceCard/RecipeCard';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';

function Drinks(props) {
  const {
    setRouteProps,
    drinkList,
    setDrinkList,
    drinksRecipe,
  } = useContext(RecipeContext);

  const [categoriesDrinks, setCategoryDrinks] = useState([]);
  const [toggleFilter, setToggleFilter] = useState('');

  useEffect(() => {
    setRouteProps(props);

    getCategoriesDrinks().then(({ drinks }) => {
      setCategoryDrinks([{ strCategory: 'All' }, ...drinks.slice(0, MAX_CATEGORIES)]);
    });
  }, []);

  const handleButton = async (strCategory) => {
    if (toggleFilter === strCategory || strCategory === 'All') {
      setDrinkList(drinksRecipe);
      setToggleFilter('');
      return;
    }

    const response = await getDrinksByCategory(strCategory);
    setDrinkList(response.drinks.slice(0, MAX_FOODS_AND_DRINKS));
    setToggleFilter(strCategory);
  };

  return (
    <section>
      <Header title="Drinks" renderSearch />

      <article>
        { categoriesDrinks.map(({ strCategory }) => (
          <Button
            key={ strCategory }
            title={ strCategory }
            testId={ `${strCategory}-category-filter` }
            onClick={ () => handleButton(strCategory) }
          />
        ))}
      </article>

      <section>
        { drinkList.map((drink, index) => (
          <Link key={ index } to={ `/drinks/${drink.idDrink}` }>
            <RecipeCard
              image={ drink.strDrinkThumb }
              name={ drink.strDrink }
              index={ index }
            />
          </Link>
        ))}
      </section>
      <Footer />
    </section>
  );
}

export default Drinks;
