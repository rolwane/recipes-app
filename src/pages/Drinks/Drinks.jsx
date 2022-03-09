/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';

// imported components
import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RepiceCard/RecipeCard';

function Drinks(props) {
  const { setRouteProps, drinkList } = useContext(RecipeContext);

  useEffect(() => {
    setRouteProps(props);
  }, []);

  return (
    <section>
      <Header title="Drinks" renderSearch />
      <div>
        {drinkList.map((drink, index) => (<RecipeCard
          key={ drink.idDrink }
          image={ drink.strDrinkThumb }
          name={ drink.strDrink }
          index={ index }
        />))}
      </div>
    </section>
  );
}

export default Drinks;
