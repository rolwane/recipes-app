import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { shareLink } from '../../helpers/functions';
import { MAX_LENGTH_TAGS } from '../../helpers/constants';
import './DoneRecipeCard.css';
import shareIcon from '../../images/shareIcon.svg';
import Button from '../Button/Button';

function DoneRecipeCard({ recipe, index }) {
  const [clickShareBtn, setClickShareBtn] = useState(false);

  const {
    id, name, nationality, image, doneDate, tags, alcoholicOrNot, category, type,
  } = recipe;

  const handleClick = () => {
    const actualLink = window.location.href.split('done');
    if (type === 'food') {
      const linkFood = `${actualLink[0]}foods/${id}`;
      shareLink(linkFood, setClickShareBtn);
    }
    const linkDrink = `${actualLink[0]}drinks/${id}`;
    shareLink(linkDrink, setClickShareBtn);
  };

  return (
    <div>
      <section className="categoryAndShare">
        { alcoholicOrNot.length > 1 ? (
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {alcoholicOrNot}
          </span>
        ) : (
          <p data-testid={ `${index}-horizontal-top-text` }>
            <span>
              { nationality }
            </span>
            {' '}
            -
            {' '}
            <span>
              {category}
            </span>
          </p>
        )}
        <Button
          onClick={ handleClick }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share button"
          />
          { clickShareBtn && <span>Link copied!</span>}
        </Button>
      </section>
      <section>

        <Link to={ `/${type}s/${id}` } className="photoAndNameCard">
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ `Recipe ${name}` }
          />
          <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
        </Link>
      </section>
      <section>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          {`Done in: ${doneDate}`}

        </p>
        { (tags.length > 0 && type === 'food') && tags.map((tag, i) => {
          if (i < MAX_LENGTH_TAGS) {
            return (
              <span data-testid={ `${index}-${tag}-horizontal-tag` } key={ i }>
                { tag }
              </span>
            );
          }
          return '';
        })}
      </section>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: propTypes.object,
  index: propTypes.number,
}.isRequired;

export default DoneRecipeCard;
