import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { GiShare } from 'react-icons/gi';
import { BsCheck } from 'react-icons/bs';
import { shareLink } from '../../helpers/functions';
import { MAX_LENGTH_TAGS } from '../../helpers/constants';
import './DoneRecipeCard.css';
// import shareIcon from '../../images/shareIcon.svg';
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

  const history = useHistory();

  return (

    <section className="done-recipe-card">

      <div className="done-recipe-content">
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ `Recipe ${name}` }
          className="recipe-image"
          onClick={ () => history.push(`/${type}s/${id}`) }
          aria-hidden="true"
        />

        <div className="done-recipe-details">
          <h3 className="done-recipe-title">{ name }</h3>

          { alcoholicOrNot.length > 1 ? (

            <span className="done-recipe-span">
              {alcoholicOrNot}
            </span>

          ) : (

            <span className="done-recipe-span">
              { `${nationality} - ${category}` }
            </span>

          )}

          <span className="done-recipe-span">
            {`Done in: ${doneDate}`}
          </span>

          { (tags.length > 0 && type === 'food') && tags.map((tag, i) => {
            if (i < MAX_LENGTH_TAGS) {
              return (
                <span className="done-recipe-span" key={ i }>
                  { tag }
                </span>
              );
            }
            return '';
          })}

        </div>
      </div>
      <Button onClick={ handleClick } className="done-share-button">
        {
          clickShareBtn
            ? <BsCheck className="check-icon" />
            : <GiShare className="share-icon" />
        }
      </Button>

    </section>

  // <div>
  //   <section className="categoryAndShare">
  //     { alcoholicOrNot.length > 1 ? (
  //       <span data-testid={ `${index}-horizontal-top-text` }>
  //         {alcoholicOrNot}
  //       </span>
  //     ) : (
  //       <p data-testid={ `${index}-horizontal-top-text` }>
  //         <span>
  //           { `${nationality} - ${category}` }
  //         </span>
  //       </p>
  //     )}

  //     <Button onClick={ handleClick }>
  //       {
  //         clickShareBtn
  //           ? <span className="span">Link copied!</span>
  //           : <GiShare className="share-icon" />
  //       }
  //     </Button>
  //   </section>

  //   <section>
  //     <Link to={ `/${type}s/${id}` } className="photoAndNameCard">
  //       <img
  //         data-testid={ `${index}-horizontal-image` }
  //         src={ image }
  //         alt={ `Recipe ${name}` }
  //       />
  //       <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
  //     </Link>
  //   </section>

  //   <section>
  //     <p
  //       data-testid={ `${index}-horizontal-done-date` }
  //     >
  //       {`Done in: ${doneDate}`}

  //     </p>
  //     { (tags.length > 0 && type === 'food') && tags.map((tag, i) => {
  //       if (i < MAX_LENGTH_TAGS) {
  //         return (
  //           <span data-testid={ `${index}-${tag}-horizontal-tag` } key={ i }>
  //             { tag }
  //           </span>
  //         );
  //       }
  //       return '';
  //     })}
  //   </section>
  // </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: propTypes.object,
  index: propTypes.number,
}.isRequired;

export default DoneRecipeCard;
