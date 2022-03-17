import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import { GiShare } from 'react-icons/gi';
import { shareLink,
  verifiedIconFavorite,
  desfavoriteRecipes,
} from '../../helpers/functions';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
// import shareIcon from '../../images/shareIcon.svg';

function FavoriteRecipes() {
  const isFavorited = true;
  const [filterRecipes, setFilterRecipes] = useState('all');
  const [favoriteList, setFavoriteList] = useState([]);
  const [shareLinkMsg, setShareLinkMsg] = useState(false);
  const [clickFavorite, setClickFavorite] = useState(1);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (filterRecipes !== 'all') {
      const filtered = favorites.filter((favorite) => favorite.type === filterRecipes);
      setFavoriteList(filtered);
      return;
    }
    setFavoriteList(favorites);
  }, [clickFavorite, filterRecipes]);

  const handleShareClick = (type, id) => {
    const link = window.location.href.split('favorite-recipes');
    const newLink = `${link[0]}${type}s/${id}`;
    shareLink(newLink, setShareLinkMsg);
  };
  const handleFavoriteBtn = (favorite) => {
    desfavoriteRecipes(favorite);
    setClickFavorite((prevState) => prevState + 1);
  };

  const classActive = 'category-active';
  const classButton = 'button-category';
  const history = useHistory();

  return (
    <section>
      <Header title="Favorite Recipes" />

      <section className="container-categories">
        <div className="container-buttons">
          <Button
            title="All"
            testId="filter-by-all-btn"
            onClick={ () => setFilterRecipes('all') }
            className={
              filterRecipes === 'all' ? classActive : classButton
            }
          />
          <Button
            title="Food"
            testId="filter-by-food-btn"
            onClick={ () => setFilterRecipes('food') }
            className={
              filterRecipes === 'food' ? classActive : classButton
            }
          />
          <Button
            title="Drinks"
            testId="filter-by-drink-btn"
            onClick={ () => setFilterRecipes('drink') }
            className={
              filterRecipes === 'drink' ? classActive : classButton
            }
          />
        </div>
      </section>

      <section className="done-recipes-container">
        { favoriteList
      && favoriteList.map((favorite, index) => (

        <div className="done-recipe-card" key={ index }>

          <div className="done-recipe-content">
            <img
              src={ favorite.image }
              alt={ favorite.name }
              className="recipe-image"
              onClick={ () => history.push(`/${favorite.type}s/${favorite.id}`) }
              aria-hidden="true"
            />

            <div className="recipe-details">
              <h3 className="done-recipe-title">{favorite.name}</h3>

              { favorite.alcoholicOrNot.length > 1 ? (

                <span className="done-recipe-span">
                  {favorite.alcoholicOrNot}
                </span>

              ) : (

                <span className="done-recipe-span">
                  { `${favorite.nationality} - ${favorite.category}` }
                </span>

              )}
              <div style={ { display: 'flex', marginTop: '10px', gap: '5px' } }>
                <Button
                  onClick={ () => handleShareClick(favorite.type, favorite.id) }
                  className="done-share-button"
                >
                  {
                    shareLinkMsg
                      ? <BsCheck className="check-icon" />
                      : <GiShare className="share-icon" />
                  }
                </Button>

                <Button
                  onClick={ () => handleFavoriteBtn(favorite) }
                  className="done-share-button"
                  title={ <img
                    data-testid="favorite-btn"
                    alt="favorite icon"
                    src={ verifiedIconFavorite(isFavorited) }
                  /> }
                />
              </div>
            </div>

          </div>

        </div>
      ))}
      </section>

      <Footer />
    </section>
  );
}

export default FavoriteRecipes;
