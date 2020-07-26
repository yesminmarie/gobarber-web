import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// será utilizado "type" ao invés de interface, pois é uma interface vazia,
// nada será sobrescrito e não serão craidas novas propriedades
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// children pega o conteúdo do botão (texto do botão)
// ...rest pega o restante das propriedades
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
