import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import { MIN_LENGTH_PASSWORD, REGEX_VALID_EMAIL } from '../../helpers/constants';
import './Login.css';
import logo from '../../images/logo.png';
// imported components
import Input from '../../components/Input/Input';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/foods');
  };

  useEffect(() => {
    const validateEmail = REGEX_VALID_EMAIL.test(email);
    const validatePassword = password.length > MIN_LENGTH_PASSWORD;

    setDisabled(!(validatePassword && validateEmail));
  }, [email, password]);

  return (
    <section className="container-login">
      <form onSubmit={ handleSubmit } className="form-login">

        <img src={ logo } alt="logo" className="logo" />

        <Input
          name="email"
          type="email"
          testId="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
          placeholder="Email"
        />

        <Input
          name="password"
          type="password"
          testId="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
          placeholder="Password"
        />
        <button
          disabled={ disabled }
          data-testId="login-submit-btn"
          type="submit"
        >
          Login
        </button>
        {/* <Input
          name="button"
          type="submit"
          testId="login-submit-btn"
          value="Login"
          disabled={ disabled }
        /> */}
      </form>

    </section>
  );
}

Login.propTypes = {
  history: propTypes.object,
}.isRequired;

export default Login;
