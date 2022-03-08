import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Input from '../../components/Input/Input';
import { MIN_LENGTH_PASSWORD } from '../../helpers/constants';

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
    const validateEmail = /\w+@\w+\.\w+/.test(email);
    const validatePassword = password.length > MIN_LENGTH_PASSWORD;

    setDisabled(!(validatePassword && validateEmail));
  }, [email, password]);

  return (
    <form onSubmit={ handleSubmit }>
      <Input
        name="email"
        type="email"
        testId="email-input"
        value={ email }
        onChange={ ({ target: { value } }) => setEmail(value) }
        label="Email:"
      />
      <Input
        name="password"
        type="password"
        testId="password-input"
        value={ password }
        onChange={ ({ target: { value } }) => setPassword(value) }
        label="Senha:"
      />
      <Input
        name="button"
        type="submit"
        testId="login-submit-btn"
        value="Login"
        disabled={ disabled }
      />
    </form>
  );
}

Login.propTypes = {
  history: propTypes.object,
}.isRequired;

export default Login;
