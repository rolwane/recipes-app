import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { shareLink,
  verifiedIconFavorite,
  desfavoriteRecipes,
} from '../../helpers/functions';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import shareIcon from '../../images/shareIcon.svg';

function FavoriteRecipes() {
  const isFavorited = true;
  const [filter, setFilter] = useState('all');
  const [favoriteList, setFavoriteList] = useState([]);
  const [shareLinkMsg, setShareLinkMsg] = useState(false);
  const [clickFavorite, setClickFavorite] = useState(1);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (filter !== 'all') {
      const filtered = favorites.filter((favorite) => favorite.type === filter);
      setFavoriteList(filtered);
      return;
    }
    setFavoriteList(favorites);
  }, [clickFavorite, filter]);

  const handleShareClick = (type, id) => {
    const link = window.location.href.split('favorite-recipes');
    const newLink = `${link[0]}${type}s/${id}`;
    shareLink(newLink, setShareLinkMsg);
  };
  const handleFavoriteBtn = (favorite) => {
    desfavoriteRecipes(favorite);
    setClickFavorite((prevState) => prevState + 1);
  };

  return (
    <section>
      <Header title="Favorite Recipes" />
      <div>
        <Button
          title="All"
          onClick={ () => setFilter('all') }
          testId="filter-by-all-btn"
        />
        <Button
          title="Foods"
          onClick={ () => setFilter('food') }
          testId="filter-by-food-btn"
        />
        <Button
          title="Drinks"
          onClick={ () => setFilter('drink') }
          testId="filter-by-drink-btn"
        />

      </div>
      { favoriteList
      && favoriteList.map((favorite, i) => (
        <div key={ favorite.id }>
          <Link
            to={ `/${favorite.type}s/${favorite.id}` }
            style={ { display: 'flex',
              flexDirection: 'column',
              height: 'fit-content' } }
          >
            <img
              src={ favorite.image }
              alt={ favorite.name }
              width="200px"
              data-testid={ `${i}-horizontal-image` }
            />
            <p data-testid={ `${i}-horizontal-top-text` }>
              {
                favorite.alcoholicOrNot.length > 0
                  ? <span>{favorite.alcoholicOrNot}</span>
                  : (
                    <span>{`${favorite.nationality} - ${favorite.category}`}</span>
                  )
              }
            </p>
            <h3
              data-testid={ `${i}-horizontal-name` }
            >
              {favorite.name}
            </h3>
          </Link>

          <Button
            type="button"
            onClick={
              () => { handleShareClick(favorite.type, favorite.id); }
            }
          >
            <img
              data-testid={ `${i}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ favorite.name }
            />
            {shareLinkMsg && <p>Link copied!</p>}
          </Button>
          <Button
            title={
              <img
                data-testid={ `${i}-horizontal-favorite-btn` }
                src={ verifiedIconFavorite(isFavorited) }
                alt="favorite icon"
              />
            }
            onClick={ () => handleFavoriteBtn(favorite) }
          />
        </div>
      ))}
    </section>
  );
}

export default FavoriteRecipes;
