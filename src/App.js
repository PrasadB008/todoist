import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  useEffect(() => {
    document.body.classList.toggle('darkmode', darkMode);
    return () => document.body.classList.remove('darkmode');
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
