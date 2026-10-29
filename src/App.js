import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';
import {
  AuthProvider,
  useAuthValue,
  signInWithGoogle,
} from './context/auth-context';

const SignIn = () => (
  <div className="sign-in" data-testid="sign-in">
    <h1>Todoist</h1>
    <button
      type="button"
      data-testid="sign-in-action"
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </button>
  </div>
);

const AppContent = ({ darkMode, setDarkMode }) => {
  const { user, loading } = useAuthValue();

  if (loading) return null;
  if (!user) return <SignIn />;

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Content />
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};

AppContent.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <AuthProvider>
      <main
        data-testid="application"
        className={darkMode ? 'darkmode' : undefined}
      >
        <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
      </main>
    </AuthProvider>
  );
};

App.propTypes = {
  darkModeDefault: PropTypes.bool,
};
