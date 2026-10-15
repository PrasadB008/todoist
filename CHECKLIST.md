# Setup Checklist

Use this checklist to ensure your local development environment is properly configured.

## Prerequisites ✓

- [ ] Node.js installed (v10.x or higher)
  - Check: `node --version`
- [ ] npm or yarn installed
  - Check: `npm --version` or `yarn --version`
- [ ] Firebase account created
  - Visit: https://console.firebase.google.com/

## Project Setup ✓

- [ ] Repository cloned
- [ ] Dependencies installed
  - Run: `npm install` or `yarn install`
- [ ] No error messages during installation

## Firebase Configuration ✓

- [ ] Firebase project created in console
- [ ] Web app registered in Firebase project
- [ ] Firestore Database enabled
- [ ] `src/firebase.js` file created (copied from `src/firebase.js.example`)
- [ ] Firebase configuration values added to `src/firebase.js`:
  - [ ] apiKey
  - [ ] authDomain
  - [ ] databaseURL
  - [ ] projectId
  - [ ] storageBucket
  - [ ] messagingSenderId
  - [ ] appId

## Firestore Data ✓

- [ ] Created `projects` collection in Firestore
- [ ] Added at least one project document with:
  - [ ] `name` (string)
  - [ ] `projectId` (string)
  - [ ] `userId` set to `"jlIFXIwyAL3tzHMtzRbw"`
- [ ] Created `tasks` collection in Firestore
- [ ] Added at least one task document with:
  - [ ] `archived` (boolean, set to `false`)
  - [ ] `date` (string, can be empty `""`)
  - [ ] `projectId` (string, matching a project)
  - [ ] `task` (string, the task description)
  - [ ] `userId` set to `"jlIFXIwyAL3tzHMtzRbw"`

## Running the App ✓

- [ ] Development server starts without errors
  - Run: `npm start` or `yarn start`
- [ ] Browser opens to http://localhost:3000
- [ ] App loads successfully
- [ ] No console errors in browser DevTools
- [ ] Can see projects in the sidebar
- [ ] Can see tasks in the main area
- [ ] Can add new tasks
- [ ] Can complete/check tasks
- [ ] Dark mode toggle works (pizza icon 🍕)

## Testing ✓

- [ ] Tests run successfully
  - Run: `npm test` (press 'a' to run all tests)
- [ ] All tests pass

## Common Issues

### App loads but no data shows
- ✅ Check Firestore security rules (start with test mode)
- ✅ Verify userId in Firestore documents matches `"jlIFXIwyAL3tzHMtzRbw"`
- ✅ Check browser console for Firebase errors

### Firebase connection errors
- ✅ Double-check all Firebase config values in `src/firebase.js`
- ✅ Ensure Firestore is enabled in Firebase Console
- ✅ Check Firebase project is active

### npm install fails
- ✅ Clear npm cache: `npm cache clean --force`
- ✅ Delete `node_modules` and `package-lock.json`, then reinstall
- ✅ Try using yarn: `yarn install`
- ✅ Check Node.js version compatibility

### Port 3000 already in use
- ✅ Kill process on port 3000 or accept prompt to use different port
- ✅ On Linux/Mac: `lsof -ti:3000 | xargs kill`
- ✅ On Windows: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`

## All Done? 🎉

If all items are checked, you're ready to develop! 

- Start coding: Check [CONTRIBUTING.md](CONTRIBUTING.md)
- Need help? Review [SETUP.md](SETUP.md) for detailed instructions
- Quick reference? See [QUICKSTART.md](QUICKSTART.md)
