import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AuthContext from './context/AuthContext';

// <AuthContext.Provider> indica que todo componente dentro dele
// terá acesso à informação de autenticação

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Yesmin' }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyle />
  </>
);

export default App;
