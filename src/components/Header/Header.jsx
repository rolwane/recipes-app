import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

// imported icons
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';

// imported components
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';

function Header(props) {
  const [showInput, setShowInput] = useState(false);
  const { title, renderSearch } = props;

  return (
    <header>

      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="a profile icon"
          data-testid="profile-top-btn"
        />
      </Link>

      <h1 data-testid="page-title">{title}</h1>

      {renderSearch && (
        <Button onClick={ () => setShowInput(!showInput) }>
          <img src={ searchIcon } data-testid="search-top-btn" alt=" a search icon" />
        </Button>
      )}

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
