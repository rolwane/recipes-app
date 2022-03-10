import React from 'react';
import propTypes from 'prop-types';
import { getRandomFood } from '../../services/foodsAPI';

// import components
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

function ExploreFoods({ history }) {
  const handleSurprise = () => {
    getRandomFood().then(({ meals }) => {
      history.push(`/foods/${meals[0].idMeal}`);
    });
  };

  return (
    <section>
      <Header title="Explore Foods" />
      <Button
        testId="explore-by-ingredient"
        title="By Ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      />
      <Button
        testId="explore-by-nationality"
        title="By Nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
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

ExploreFoods.propTypes = {
  history: propTypes.object,
}.isRequired;

export default ExploreFoods;
