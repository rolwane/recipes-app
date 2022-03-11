import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

// imported components
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function Profile({ history }) {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user')) || {};
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <section>
      <Header title="Profile" />

      <h2 data-testid="profile-email">{userEmail}</h2>

      <Button
        title="Done Recipes"
        testId="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      />

      <Button
        title="Favorite Recipes"
        testId="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      />

      <Button
        title="Logout"
        testId="profile-logout-btn"
        onClick={ handleLogout }
      />

      <Footer />
    </section>
  );
}

Profile.propTypes = {
  history: propTypes.object,
}.isRequired;

export default Profile;
