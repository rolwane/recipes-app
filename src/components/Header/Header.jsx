import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import propTypes from 'prop-types';

import './Header.css';

// imported components
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';

function Header(props) {
  const [showInput, setShowInput] = useState(false);
  const { title, renderSearch } = props;

  return (
    <header>

      <Link to="/profile">
        <FaUserCircle className="profile-icon" />
      </Link>

      <h1 data-testid="page-title">{title}</h1>

      {renderSearch && (
        <Button onClick={ () => setShowInput(!showInput) } className="btn-search">
          <AiOutlineSearch />
        </Button>
      )}

      <SearchBar
        className={ showInput ? 'show-searchbar' : '' }
        setShowInput={ setShowInput }
      />
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
