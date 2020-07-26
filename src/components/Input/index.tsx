import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

// extende as propriedades que já esxistem em um input do HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // name então se torna obrigatório
  // ? -> indica que o ícone não é obrigatório
  // recebe um componente como propriedade (ComponentType)
  // IconBaseProps -> propriedades do componente
  icon?: React.ComponentType<IconBaseProps>; // recebe um componente como propriedade
}

// ...rest -> recebe o resto das propriedades
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  // a constante inputRef será usada para fazer referência ao elemento input
  // dentro da tag input deve ser inserida a referência
  const inputRef = useRef(null);
  // useField recebe como parÂmetro o nome do campo e retorna várias propriedades
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // registerField -> faz o registro do input assim que ele for exibido na tela
  useEffect(() => {
    registerField({
      name: fieldName, // O Unform às vezes altera o nome do campo, por isso usar fieldName
      ref: inputRef.current, // pega o input,
      path: 'value', // pega o valor do atributo value
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
      {/* ...rest -> passa todas as propriedades em input
        defaultValue -> seta um valor inicial, preenche o input com algum valor
      */}
    </Container>
  );
};

export default Input;
