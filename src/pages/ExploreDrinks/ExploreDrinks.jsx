import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { BiShuffle } from 'react-icons/bi';
import { FaCocktail } from 'react-icons/fa';
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
      <div className="explore-container">
        <Link to="/explore/drinks/ingredients" className="card-link">
          <FaCocktail className="explore-icon" />
          <span>Explore Drinks</span>
        </Link>

        <Button
          testId="explore-surprise"
          onClick={ handleSurprise }
          className="btn-surprise-me"
        >
          <BiShuffle className="explore-icon" />
          <span>Surprise me!</span>
        </Button>
      </div>
      <Footer page="explore" />
    </section>
  );
}

ExploreDrinks.propTypes = {
  history: propTypes.object,
}.isRequired;

export default ExploreDrinks;
