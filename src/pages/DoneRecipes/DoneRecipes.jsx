import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard/DoneRecipeCard';
import Button from '../../components/Button/Button';

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
    // setDoneRecipes(recipeMock);
  }, [filterRecipes]);

  return (
    <section>
      <Header title="Done Recipes" />
      <Button
        title="All"
        testId="filter-by-all-btn"
        onClick={ () => setFilterRecipes('all') }
      />
      <Button
        title="Food"
        testId="filter-by-food-btn"
        onClick={ () => setFilterRecipes('food') }
      />
      <Button
        title="Drinks"
        testId="filter-by-drink-btn"
        onClick={ () => setFilterRecipes('drink') }
      />
      { doneRecipes ? doneRecipes.map((recipe, index) => (
        <DoneRecipeCard key={ index } recipe={ recipe } index={ index } />
      )) : <h3>You do not have any done recipes yet!</h3> }

    </section>
  );
}

export default DoneRecipes;
