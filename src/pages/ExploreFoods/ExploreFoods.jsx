import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import { BiWorld } from 'react-icons/bi';
import { GiFruitBowl, GiEarthAmerica } from 'react-icons/gi';
import { BiShuffle } from 'react-icons/bi';

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
      <div className="explore-container">

        <Link to="/explore/foods/ingredients" className="card-link">
          <GiFruitBowl className="explore-icon" />
          <span>By Ingredient</span>
        </Link>

        <Link to="/explore/foods/nationalities" className="card-link">
          <GiEarthAmerica className="explore-icon" />
          <span>By Nationality</span>
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

ExploreFoods.propTypes = {
  history: propTypes.object,
}.isRequired;

export default ExploreFoods;
