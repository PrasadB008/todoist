import { collatedTasks } from '../constants';

export const getTitle = (projects, projectId) =>
  projects.find(project => project.projectId === projectId);

export const getCollatedTitle = (projects, key) =>
  projects.find(project => project.key === key);

export const collatedTasksExist = selectedProject =>
  collatedTasks.find(task => task.key === selectedProject);

// Returns 0 for a missing or empty `projects` list; projects without a
// `tasks` array count as having no tasks.
export const averageTaskCount = projects => {
  if (!projects || projects.length === 0) return 0;

  const total = projects.reduce(
    (sum, project) => sum + ((project && project.tasks) || []).length,
    0
  );

  return total / projects.length;
};

// Returns undefined for a missing or empty `tasks` list.
export const firstTaskName = tasks =>
  tasks && tasks.length > 0 ? tasks[0].name : undefined;

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
