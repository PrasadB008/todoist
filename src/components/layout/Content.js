import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

export const Content = ({ darkMode = false, setDarkMode }) => (
  <section className="content">
    <Sidebar />
    <Tasks darkMode={darkMode} setDarkMode={setDarkMode} />
  </section>
);

Content.propTypes = {
  darkMode: PropTypes.bool,
  setDarkMode: PropTypes.func,
};
