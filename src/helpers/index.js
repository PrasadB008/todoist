import { collatedTasks } from '../constants';

export const getTitle = (projects, projectId) =>
  projects.find(project => project.projectId === projectId);

export const getCollatedTitle = (projects, key) =>
  projects.find(project => project.key === key);

export const collatedTasksExist = selectedProject =>
  collatedTasks.find(task => task.key === selectedProject);

// Returns 0 for an empty list instead of NaN (0 / 0).
export const averageTaskCount = (projects) =>
  projects.length === 0
    ? 0
    : projects.reduce((total, project) => total + project.taskCount, 0) /
      projects.length;

// Returns null when tasks is empty or missing.
export const firstTaskName = (tasks) =>
  tasks && tasks.length > 0 ? tasks[0].name : null;

export const generatePushId = (() => {
  const PUSH_CHARS =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  // Timestamp of the previous call and its 12 random 6-bit values, kept so
  // that ids created in the same millisecond are unique and sort in order.
  let lastPushTime = 0;
  const lastRandChars = [];

  return function() {
    let now = new Date().getTime();
    const duplicateTime = now === lastPushTime;
    lastPushTime = now;

    const timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join('');

    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      // Same millisecond: increment the previous random part by one (with
      // carry) so the new id is unique and sorts after the previous one.
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      if (i >= 0) {
        lastRandChars[i] += 1;
      }
    }

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }

    return id;
  };
})();
