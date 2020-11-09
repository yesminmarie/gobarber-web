import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(), // retorna a função useHistory vazia, sem funcionamento
    // ReactNode -> tipgem do Typescript. É qualquer conteúdo que um componente React pode receber
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    // debug dá um console.log do html
    const { debug } = render(<SignIn />);

    debug();
  });
});
