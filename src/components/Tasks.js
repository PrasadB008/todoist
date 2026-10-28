import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Tasks = ({ darkMode = false, setDarkMode }) => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = '';

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  return (
    <div className="tasks" data-testid="tasks">
      <div className="tasks__header">
        <h2 data-testid="project-name">{projectName}</h2>
        {setDarkMode && (
          <button
            className="tasks__darkmode-toggle"
            data-testid="tasks-dark-mode-toggle"
            type="button"
            role="switch"
            aria-checked={darkMode}
            onClick={() => setDarkMode(!darkMode)}
          >
            Dark mode
            <span className="toggle-track">
              <span className="toggle-thumb" />
            </span>
          </button>
        )}
      </div>

      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
};

Tasks.propTypes = {
  darkMode: PropTypes.bool,
  setDarkMode: PropTypes.func,
};
