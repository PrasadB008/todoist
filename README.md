## Building Todoist from Scratch Using React (Custom Hooks, Context), Firebase & React Testing Library (http://bit.ly/CognitiveSurge)

This application (a Todoist clone) was built using create-react-app as a base, and the technologies used were React (Custom Hooks, Context), Firebase & React Testing Library. I'm hoping this gives people a better understanding of React, and I've also included SCSS in this project, but the main focus is to build a real application using React! If you clone this application, click the Pizza icon on the top right, it enables dark mode!

Subscribe to my YouTube channel here: http://bit.ly/CognitiveSurge where I build projects like this! And don't forget, you can contribute to this project (highly encouraged!). One thing I didn't have time to do was incorporate accessibility into this application, so I'd love to see that added!

## Setup

1. Create a Firebase project with Cloud Firestore enabled.
2. Copy `.env.example` to `.env.local` (gitignored) and fill in your Firebase web app settings and the `REACT_APP_USER_ID` value stored in the `userId` field of your tasks and projects.
3. `yarn install`, then `yarn start`.

Note: this app has no sign-in yet. `REACT_APP_USER_ID` only selects which documents are read and written; it is not access control, so protect your data with Firestore security rules.

![Preview](todoist-preview.png?raw=true)
