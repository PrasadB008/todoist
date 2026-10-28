import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';

const STORAGE_KEY = 'darkMode';

const readStoredDarkMode = (fallback) => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === null ? fallback : stored === 'true';
  } catch (e) {
    return fallback;
  }
};

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(() =>
    readStoredDarkMode(darkModeDefault)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(darkMode));
    } catch (e) {
      // storage unavailable: the toggle still works for this session
    }
  }, [darkMode]);

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

App.propTypes = {
  darkModeDefault: PropTypes.bool,
};
