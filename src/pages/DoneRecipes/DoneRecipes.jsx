import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard/DoneRecipeCard';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';

function DoneRecipes() {
  const [filterRecipes, setFilterRecipes] = useState('all');
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (filterRecipes !== 'all') {
      const filteredRecipes = getDoneRecipes
        .filter((recipe) => recipe.type === filterRecipes);
      setDoneRecipes(filteredRecipes);
      return;
    }
    setDoneRecipes(getDoneRecipes);
  }, [filterRecipes]);

  const classActive = 'category-active';
  const classButton = 'button-category';

  return (
    <section className="done-recipe-container">
      <Header title="Done Recipes" />
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
        { doneRecipes ? doneRecipes.map((recipe, index) => (
          <DoneRecipeCard key={ index } recipe={ recipe } index={ index } />
        )) : <h3>You do not have any done recipes yet!</h3> }
      </section>

      <Footer />
    </section>
  );
}

export default DoneRecipes;
