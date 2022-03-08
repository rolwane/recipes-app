/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import RecipeContext from '../../context/RecipeContext';

// imported components
import Header from '../../components/Header/Header';

function Foods(props) {
  const { setRouteProps } = useContext(RecipeContext);

  useEffect(() => {
    setRouteProps(props);
  }, []);

  return (
    <section>
      <Header title="Foods" renderSearch />
    </section>
  );
}

export default Foods;
