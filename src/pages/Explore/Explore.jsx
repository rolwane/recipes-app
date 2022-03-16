import React from 'react';
import { Link } from 'react-router-dom';
import { MdFastfood } from 'react-icons/md';
import { FaCocktail } from 'react-icons/fa';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import './Explore.css';

function Explore() {
  return (
    <section>
      <Header title="Explore" />

      <div className="explore-container">
        <Link to="/explore/foods" className="card-link">
          <MdFastfood className="explore-icon" />
          <span>Explore Foods</span>
        </Link>
        <Link to="/explore/drinks" className="card-link">
          <FaCocktail className="explore-icon" />
          <span>Explore Drinks</span>
        </Link>
      </div>

      <Footer page="explore" />
    </section>

  );
}

export default Explore;
