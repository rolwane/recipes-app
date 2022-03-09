import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';

import SearchBar from '../SearchBar/SearchBar';

function Header(props) {
  const [showInput, setShowInput] = useState(false);
  const { title, renderSearch } = props;

  return (
    <header>
      <Link to="/profile">
        <img src={ profileIcon } alt="a profile icon" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      { renderSearch
      && (
        <button type="button" onClick={ () => setShowInput(!showInput) }>
          <img src={ searchIcon } data-testid="search-top-btn" alt=" a search icon" />
        </button>)}
      { showInput && <SearchBar /> }
    </header>
  );
}

Header.propTypes = {
  props: propTypes.shape({
    title: propTypes.string,
    renderSearch: propTypes.bool,
  }),
}.isRequired;

export default Header;
