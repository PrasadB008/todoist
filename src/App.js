import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { SignIn } from './components/SignIn';
import {
  AuthProvider,
  ProjectsProvider,
  SelectedProjectProvider,
  useAuthValue,
} from './context';

const AuthGate = ({ darkMode, setDarkMode }) => {
  const { user, loading } = useAuthValue();

  if (loading) return null;
  if (!user) return <SignIn />;

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
