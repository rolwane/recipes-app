import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function Explore() {
  return (
    <section>
      <Header title="Explore" />
      <Link to="/explore/foods">
        <button type="button" data-testid="explore-foods">Explore Foods</button>
      </Link>
      <Link to="/explore/drinks">
        <button type="button" data-testid="explore-drinks">Explore Drinks</button>
      </Link>
      <Footer />
    </section>

  );
}

export default Explore;
