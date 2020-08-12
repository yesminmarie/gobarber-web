import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// <AuthContext.Provider> indica que todo componente dentro dele
// terá acesso à informação de autenticação

export const AuthProvider: React.FC = ({ children }) => {
  // estado para pegar o token e o usuário
  const [data, setData] = useState<AuthState>(() => {
    // Essas veráveis pegam o conteúdo do localStorage.
    // Isso será usado apenas quando o usuário atualizar a página
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    // se token e user não existirem, retorna o token e o user
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    // senão inicializa o objeto vazio
    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  // se o desenvolvedor não colocar o AuthProvider por volta do app (SignIn, por exemplo)
  // vai disparar um erro porque o contexto não vai existir
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
