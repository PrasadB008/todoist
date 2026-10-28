import React, { useEffect, useState } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  const [searchTerm, setSearchTerm] = useState('');

  const normalizedTerm = searchTerm.trim().toLowerCase();
  const filteredTasks = normalizedTerm
    ? tasks.filter((task) =>
        (task.task || '').toLowerCase().includes(normalizedTerm)
      )
    : tasks;

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

      <input
        className="tasks__search"
        data-testid="task-search"
        type="search"
        placeholder="Search tasks by title"
        aria-label="Search tasks by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="tasks__list">
        {filteredTasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 && searchTerm.trim() !== '' && (
        <p className="tasks__no-results" data-testid="no-results">
          No tasks match your search.
        </p>
      )}

      <AddTask />
    </div>
  );
};
