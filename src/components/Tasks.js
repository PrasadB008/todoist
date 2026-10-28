import React, { useEffect, useState } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import {
  getTitle,
  getCollatedTitle,
  collatedTasksExist,
  isOverdue,
} from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);
  const visibleTasks = showOverdueOnly ? tasks.filter(isOverdue) : tasks;

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
      <h2 data-testid="project-name">{projectName}</h2>

      <button
        type="button"
        className={`tasks__overdue-filter${showOverdueOnly ? ' active' : ''}`}
        data-testid="overdue-filter"
        aria-pressed={showOverdueOnly}
        onClick={() => setShowOverdueOnly(!showOverdueOnly)}
      >
        {showOverdueOnly ? 'Show all tasks' : 'Show overdue only'}
      </button>

      <ul className="tasks__list">
        {visibleTasks.map((task) => (
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
