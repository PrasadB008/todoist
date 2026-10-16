# Local Setup Guide for Todoist Clone

This guide will help you set up and run the Todoist clone project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 10.x or higher)
- **npm** (comes with Node.js) or **yarn**
- **Firebase account** (free tier is sufficient)

## Installation Steps

### 1. Clone the Repository

If you haven't already, clone this repository:
```bash
git clone <repository-url>
cd todoist
```

### 2. Install Dependencies

Install all required npm packages:

**Using npm:**
```bash
npm install
```

**Using yarn:**
```bash
yarn install
```

### 3. Set Up Firebase

#### 3.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project
4. Once created, click on the web icon (</>) to add a web app
5. Register your app with a nickname (e.g., "Todoist Clone")
6. Copy the Firebase configuration object

#### 3.2 Configure Firebase in Your Project

1. Navigate to the `src` directory
2. Copy the `firebase.js.example` file and rename it to `firebase.js`:
   ```bash
   cp src/firebase.js.example src/firebase.js
   ```

3. Open `src/firebase.js` and replace the empty strings with your Firebase configuration values:
   ```javascript
   import firebase from "firebase/app";
   import "firebase/firestore";

   const firebaseConfig = firebase.initializeApp({
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     databaseURL: "YOUR_DATABASE_URL",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   });

   export { firebaseConfig as firebase };
   ```

#### 3.3 Set Up Firestore Database

1. In the Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Start in **test mode** (for development) or **production mode** (requires security rules)
4. Choose a Cloud Firestore location
5. Click "Enable"

#### 3.4 Add Initial Data (Optional but Recommended)

The app uses two collections: `tasks` and `projects`. You need to add some seed data with a userId:

**Projects Collection:**
Create a collection called `projects` with documents like:
```json
{
  "name": "Music",
  "projectId": "1",
  "userId": "jlIFXIwyAL3tzHMtzRbw"
}
```

**Tasks Collection:**
Create a collection called `tasks` with documents like:
```json
{
  "archived": false,
  "date": "",
  "projectId": "1",
  "task": "Example task",
  "userId": "jlIFXIwyAL3tzHMtzRbw"
}
```

> **Note:** The hardcoded userId `jlIFXIwyAL3tzHMtzRbw` is used in the app (see `src/hooks/index.js`). You can either use this ID for your seed data or modify the code to use a different userId.

### 4. Run the Application

Start the development server:

**Using npm:**
```bash
npm start
```

**Using yarn:**
```bash
yarn start
```

The application should automatically open in your browser at `http://localhost:3000`.

## Available Scripts

### `npm start` or `yarn start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test` or `yarn test`
Launches the test runner in watch mode.

### `npm run build` or `yarn build`
Builds the app for production to the `build` folder.

## Features

- ✅ Create, edit, and delete tasks
- ✅ Organize tasks by projects
- ✅ Filter tasks by Today, Next 7 days, and Inbox
- ✅ Dark mode support (click the pizza icon in the top right!)
- ✅ Responsive design

## Troubleshooting

### Firebase Connection Issues
- Double-check that all Firebase configuration values are correct
- Ensure Firestore is enabled in your Firebase project
- Check Firebase Console for any security rule errors

### Module Not Found Errors
- Run `npm install` or `yarn install` again
- Delete `node_modules` and `package-lock.json` (or `yarn.lock`), then reinstall

### Port Already in Use
If port 3000 is already in use, you can:
- Kill the process using port 3000
- The app will prompt you to use a different port - just type 'Y'

### Build Errors with node-sass
If you encounter issues with `node-sass`, try:
```bash
npm rebuild node-sass
```

## Project Structure

```
todoist/
├── public/              # Static files
├── src/
│   ├── __tests__/      # Test files
│   ├── components/     # React components
│   ├── constants/      # Constants and config
│   ├── context/        # React Context providers
│   ├── helpers/        # Helper functions
│   ├── hooks/          # Custom React hooks
│   ├── App.js          # Main App component
│   ├── App.scss        # Main styles
│   ├── firebase.js     # Firebase configuration (create this!)
│   └── index.js        # Entry point
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! The original author has noted that accessibility features would be a great addition to this project.

## License

See LICENSE.txt for details.
