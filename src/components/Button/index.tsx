import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// será utilizado "type" ao invés de interface, pois é uma interface vazia,
// nada será sobrescrito e não serão criadas novas propriedades
// receberá também a propriedade "loading"
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

// children pega o conteúdo do botão (texto do botão)
// ...rest pega o restante das propriedades
const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
