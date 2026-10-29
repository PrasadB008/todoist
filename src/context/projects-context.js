import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useProjects } from '../hooks';
import { useAuthValue } from './auth-context';

export const ProjectsContext = createContext();
export const ProjectsProvider = ({ children }) => {
  const { user } = useAuthValue();
  const { projects, setProjects } = useProjects(user && user.uid);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsValue = () => useContext(ProjectsContext);

ProjectsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
