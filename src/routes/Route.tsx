import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

// RouteProps terá todas as propriedades de ReactDOMRouteProps + isPrivate, que não é obrigatória
interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; // cria uma propriedade para receber o componenete no formato component={Nome}
}

// rota é privada/usuário estar autenticado

// true/true = OK
// true/false = Redirecionar o usuário pro login
// false/true = Redirecionar o usuário pro Dashboard
// false/false = OK

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // se for true === true ou false === false, vai mostrar o componente da forma que deve ser
        return isPrivate === !!user ? (
          <Component />
        ) : (
            // caso contrário, o usuário será redirecionado para a tela de login se isPrivate for true
            // ou será redirecionado para a tela de Dashboard se isPrivate for false
            // eslint-disable-next-line react/jsx-indent
            <Redirect
              to={{
                pathname: isPrivate ? '/' : '/dashboard',
                state: { from: location }, // garante que o histórico de acesso de rotas não seja perdido
              }}
            />
          );
      }}
    />
  );
};

export default Route;
