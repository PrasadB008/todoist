import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { firebase } from '../firebase';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks, archivedTasks = [] } = useTasks(selectedProject);

  const clearCompleted = () => {
    const db = firebase.firestore();
    const batch = db.batch();
    archivedTasks.forEach((task) => {
      batch.delete(db.collection('tasks').doc(task.id));
    });
    return batch.commit();
  };

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

      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      {archivedTasks.length > 0 && (
        <button
          type="button"
          className="tasks__clear-completed"
          data-testid="clear-completed"
          onClick={clearCompleted}
        >
          Clear all completed
        </button>
      )}

      <AddTask />
    </div>
  );
};
