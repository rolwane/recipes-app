import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('tela de login', () => {

  it('tela de ao clicar no botão de login é redirecionado para rota correta', () => {

    render(<App />);

    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'rolwane@hotemail.com');
    userEvent.type(senha, '12345678');

    expect(button).not.toHaveAttribute('disabled');

    userEvent.click(button, undefined, {skipPointerEventsCheck: true})
    
    const h1 = screen.getByRole('heading', {name: 'Foods'  });

    expect(h1).toBeInTheDocument();
  });

});