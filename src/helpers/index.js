import moment from 'moment';
import { collatedTasks } from '../constants';

// Formats a task due date (stored as 'DD/MM/YYYY') for display: "Today",
// "Tomorrow" or a short date such as "Oct 30". Returns '' when the date is
// missing or invalid. `now` is injectable to keep the helper testable.
export const formatDueDate = (date, now = moment()) => {
  if (!date) return '';

  const due = moment(date, 'DD/MM/YYYY', true);
  if (!due.isValid()) return '';

  const today = moment(now).startOf('day');
  const days = due.startOf('day').diff(today, 'days');

  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return due.format('MMM D');
};

export const getTitle = (projects, projectId) =>
  projects.find(project => project.projectId === projectId);

export const getCollatedTitle = (projects, key) =>
  projects.find(project => project.key === key);

export const collatedTasksExist = selectedProject =>
  collatedTasks.find(task => task.key === selectedProject);

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
