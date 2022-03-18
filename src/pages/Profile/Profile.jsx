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

  return (
    <section>
      <Header title="Profile" renderLogout />

      <div className="explore-container" sty>

        <h3
          data-testid="profile-email"
          style={ {
            display: 'block',
            width: '100%',
            textAlign: 'center',
            marginBottom: '10px',
          } }
        >
          {userEmail}
        </h3>

        <Button
          title="Done Recipes"
          testId="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          className="button-category"
        />

        <Button
          title="Favorite Recipes"
          testId="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
          className="button-category"
        />

      </div>

      <Footer />
    </section>
  );
}

Profile.propTypes = {
  history: propTypes.object,
}.isRequired;

export default Profile;
