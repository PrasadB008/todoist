// Id of the user whose projects and tasks are read and written.
// Set REACT_APP_USER_ID in your environment (see .env.example).
export const USER_ID = process.env.REACT_APP_USER_ID;

export const collatedTasks = [
  { key: 'INBOX', name: 'Inbox' },
  { key: 'TODAY', name: 'Today' },
  { key: 'NEXT_7', name: 'Next 7 Days' },
];
