import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

// extende as propriedades que já esxistem em um input do HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // name então se torna obrigatório
  // ? -> indica que o ícone não é obrigatório
  // recebe um componente como propriedade (ComponentType)
  // IconBaseProps -> propriedades do componente
  icon?: React.ComponentType<IconBaseProps>; // recebe um componente como propriedade
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon size={20} />}
    <input {...rest} /> {/* passa todas as propriedades em input */}
  </Container>
);

export default Input;
