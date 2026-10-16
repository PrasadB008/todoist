import { collatedTasks } from '../constants';

export const getTitle = (projects, projectId) =>
  projects.find(project => project.projectId === projectId);

export const getCollatedTitle = (projects, key) =>
  projects.find(project => project.key === key);

export const collatedTasksExist = selectedProject =>
  collatedTasks.find(task => task.key === selectedProject);

export const generatePushId = (() => {
  const PUSH_CHARS =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  // Timestamp of the last generated id, and the 12 random suffix values
  // (0-63) used for it. Reused so ids made in the same millisecond still
  // sort in creation order.
  let lastPushTime = -1;
  const lastRandChars = [];

  return function() {
    let now = new Date().getTime();
    const duplicateTime = now === lastPushTime;
    lastPushTime = now;

    const timeStampChars = new Array(8);
    for (let i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join('');

    if (!duplicateTime) {
      for (let j = 0; j < 12; j++) {
        lastRandChars[j] = Math.floor(Math.random() * 64);
      }
    } else {
      // Same millisecond: increment the previous suffix by one.
      let k = 11;
      while (k >= 0 && lastRandChars[k] === 63) {
        lastRandChars[k] = 0;
        k--;
      }
      if (k >= 0) {
        lastRandChars[k] += 1;
      }
    }

    for (let j = 0; j < 12; j++) {
      id += PUSH_CHARS.charAt(lastRandChars[j]);
    }

    return id;
  };
})();
