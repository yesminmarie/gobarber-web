import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

// ao invés de importar diretamente o contexto, importar apenas o AuthProvider (entre chaves,
// pois no arquivo AuthContext, AuthProvider não está sendo exportado como default)
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
