import React, { useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import RecipeContext from '../../context/RecipeContext';

function FoodNationalities() {
  const { foodsRecipe } = useContext(RecipeContext);

  const nationalities = foodsRecipe.map(({ strArea }) => strArea);
  const filterNationalities = nationalities
    .filter((food, index) => nationalities.indexOf(food) === index);

  // const nationalitiesOptions = filterNationalities
  //   .map((item, index) => (<option key={ index }>{ item }</option>));

  return (
    <section>
      <Header title="Explore Nationalities" renderSearch />
      <Input
        type="select"
        testId="explore-by-nationality-dropdown"
        value={ filterNationalities }
      />
      {console.log(filterNationalities)}
      <Footer />
    </section>
  );
}

export default FoodNationalities;

// Referência : https://pt.stackoverflow.com/questions/16483/remover-elementos-repetido-dentro-de-um-array-em-javascript;
