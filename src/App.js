import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import {
  AuthProvider,
  ProjectsProvider,
  SelectedProjectProvider,
  useAuthValue,
} from './context';

const AuthGate = ({ darkMode, setDarkMode }) => {
  const { user, loading, signIn } = useAuthValue();

  if (loading) return null;

  if (!user) {
    return (
      <main data-testid="sign-in" className={darkMode ? 'darkmode' : undefined}>
        <button type="button" data-testid="sign-in-button" onClick={signIn}>
          Sign in with Google
        </button>
      </main>
    );
  }

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main
          data-testid="application"
          className={darkMode ? 'darkmode' : undefined}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};

AuthGate.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <AuthProvider>
      <AuthGate darkMode={darkMode} setDarkMode={setDarkMode} />
    </AuthProvider>
  );
};

App.propTypes = {
  darkModeDefault: PropTypes.bool,
};
