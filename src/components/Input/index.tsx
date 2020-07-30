import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

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
  const inputRef = useRef<HTMLInputElement>(null);

  // estado para o foco do input
  const [isFocused, setIsFocused] = useState(false);

  // estado para verificar se input possui algum valor (usado para deixar o ícone laranja, mesmo após tirar o foco)
  const [isFilled, setIsFilled] = useState(false);

  // useField recebe como parâmetro o nome do campo e retorna várias propriedades
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  // useCallback para verificar se o input perdeu o foco
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // ? -> serve para verificar se o inputRef possui algum valor,
    // se não colocar ? dará erro, pois inputRef é inicializado com valor nulo
    if (inputRef.current?.value) {
      // !! -> se inputRef tiver algum valor, ele será true, se estiver vazio será false
      setIsFilled(!!inputRef.current?.value);
    }
  }, []);

  // registerField -> faz o registro do input assim que ele for exibido na tela
  useEffect(() => {
    registerField({
      name: fieldName, // O Unform às vezes altera o nome do campo, por isso usar fieldName
      ref: inputRef.current, // pega o input,
      path: 'value', // pega o valor do atributo value
    });
  }, [fieldName, registerField]);
  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
      {/* onFocus -> recebeu o foco
        onBlur -> perdeu o foco
        defaultValue -> seta um valor inicial, preenche o input com algum valor
        ...rest -> passa todas as propriedades em input
      */}
    </Container>
  );
};

export default Input;
