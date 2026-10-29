import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useProjects } from '../hooks';
import { useUserValue } from './user-context';

export const ProjectsContext = createContext();
export const ProjectsProvider = ({ children }) => {
  const { userId } = useUserValue();
  const { projects, setProjects } = useProjects(userId);

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
