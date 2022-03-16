import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import propTypes from 'prop-types';

import { MdFastfood } from 'react-icons/md';
import { FaCompass, FaCocktail } from 'react-icons/fa';

import './Footer.css';

function Footer({ page }) {
  const classActive = 'page-active';
  return (
    <footer data-testid="footer">
      <Link to="/foods">
        <MdFastfood className={ `footer-icon ${page === 'foods' && classActive}` } />
      </Link>

      <Link to="/explore">
        <FaCompass className={ `footer-icon ${page === 'explore' && classActive}` } />
      </Link>

      <Link to="/drinks">
        <FaCocktail className={ `footer-icon ${page === 'drinks' && classActive}` } />
      </Link>
    </footer>
  );
}

Footer.propTypes = {
  page: propTypes.string,
}.isRequired;

export default Footer;
