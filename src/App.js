import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import {
  ProjectsProvider,
  SelectedProjectProvider,
  UserProvider,
} from './context';

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <UserProvider>
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
    </UserProvider>
  );
};

App.propTypes = {
  darkModeDefault: PropTypes.bool,
};
