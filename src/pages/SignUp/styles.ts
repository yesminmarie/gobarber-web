import styled from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch; /* estica o conteúdo para ocupar toda a altura */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* justify-content: center;
     align-items: center;

     podem ser substituídos por:

     place-content: center;
  */

  place-content: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  /* sinal de maior (>) -> indica que somente as âncoras (a) que estão diretamente dentro de "Content" serão estilizadas */
  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Background = styled.div`
  flex: 1; /* vai ocupar todo o espaço menos os 700px de "Content" */

  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover; /* a imagem ocupa todo o espaço*/
`;
