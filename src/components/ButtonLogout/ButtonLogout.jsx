import React from 'react';
import { useHistory } from 'react-router-dom';
import { GoSignOut } from 'react-icons/go';

import './ButtonLogout.css';

function ButtonLogout() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <button
      type="button"
      onClick={ handleLogout }
      className="button-logout"
    >
      <GoSignOut className="logout-icon" />
    </button>
  );
}

export default ButtonLogout;
