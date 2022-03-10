import React from 'react';
import propTypes from 'prop-types';
import { getRandomDrink } from '../../services/drinksAPI';

// import components
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function ExploreDrinks({ history }) {
  const handleSurprise = () => {
    getRandomDrink().then(({ drinks }) => {
      history.push(`/drinks/${drinks[0].idDrink}`);
    });
  };
  return (
    <section>
      <Header title="Explore Drinks" />
      <Button
        testId="explore-by-ingredient"
        title="By Ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      />
      <Button
        testId="explore-surprise"
        title="Surprise me!"
        onClick={ handleSurprise }
      />
      <Footer />
    </section>
  );
}

ExploreDrinks.propTypes = {
  history: propTypes.object,
}.isRequired;

export default ExploreDrinks;
