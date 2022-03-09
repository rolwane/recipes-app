import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drink icon" />
      </Link>
      <Link to="/explore">
        <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="explore icon" />
      </Link>
      <Link to="foods">
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="meal icon" />
      </Link>
    </footer>
  );
}

export default Footer;
