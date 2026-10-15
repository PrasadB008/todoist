# Quick Start Guide

## 🚀 Running the Project Locally in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 2: Set Up Firebase
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database
3. Copy your Firebase config

### Step 3: Configure Firebase
```bash
# The firebase.js file is already created - just add your credentials
nano src/firebase.js  # or use any text editor
```

Replace the placeholder values with your actual Firebase configuration.

### Step 4: Start the App
```bash
npm start
# or
yarn start
```

The app will open at http://localhost:3000 🎉

## Dark Mode
Click the **pizza icon** 🍕 in the top right corner to toggle dark mode!

## Need More Help?
- See [SETUP.md](./SETUP.md) for detailed instructions including:
  - Firebase setup walkthrough
  - Adding seed data to Firestore
  - Troubleshooting common issues
  - Project structure overview
- Use [CHECKLIST.md](./CHECKLIST.md) to verify your setup is complete
- Check [CONTRIBUTING.md](./CONTRIBUTING.md) if you want to contribute

## Quick Firebase Data Setup

After enabling Firestore, you'll need to add some initial data:

### Create a `projects` collection with a document:
```json
{
  "name": "Music",
  "projectId": "1",
  "userId": "jlIFXIwyAL3tzHMtzRbw"
}
```

### Create a `tasks` collection with a document:
```json
{
  "archived": false,
  "date": "",
  "projectId": "1",
  "task": "Learn React with Todoist",
  "userId": "jlIFXIwyAL3tzHMtzRbw"
}
```

That's it! You're ready to use the Todoist clone! 🎯
