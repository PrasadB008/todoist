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

  // State kept between calls so ids created in the same millisecond stay
  // unique and sort in creation order.
  let lastPushTime = -1;
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
      // Same millisecond: increment the previous suffix by one (base 64).
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
