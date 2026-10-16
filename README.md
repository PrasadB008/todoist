## Building Todoist from Scratch Using React (Custom Hooks, Context), Firebase & React Testing Library (http://bit.ly/CognitiveSurge)

This application (a Todoist clone) was built using create-react-app as a base, and the technologies used were React (Custom Hooks, Context), Firebase & React Testing Library. I'm hoping this gives people a better understanding of React, and I've also included SCSS in this project, but the main focus is to build a real application using React! If you clone this application, click the Pizza icon on the top right, it enables dark mode!

Subscribe to my YouTube channel here: http://bit.ly/CognitiveSurge where I build projects like this! And don't forget, you can contribute to this project (highly encouraged!). One thing I didn't have time to do was incorporate accessibility into this application, so I'd love to see that added!

![Preview](todoist-preview.png?raw=true)

## 🚀 Getting Started

Want to run this project locally? Check out these guides:

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Detailed Setup Guide](SETUP.md)** - Complete instructions with troubleshooting

### Prerequisites
- Node.js (v10+)
- npm or yarn
- Firebase account (free tier)

### Quick Setup
```bash
# 1. Install dependencies
npm install

# 2. Set up Firebase configuration
cp src/firebase.js.example src/firebase.js
# Edit src/firebase.js with your Firebase credentials

# 3. Start the app
npm start
```

The app will be available at `http://localhost:3000`

### Automated Setup (Linux/Mac)
For an easier setup, you can use the included setup script:
```bash
chmod +x setup.sh
./setup.sh
```

## 🤝 Contributing

Contributions are welcome! Check out the [Contributing Guide](CONTRIBUTING.md) to get started.

Looking for ideas? The project would benefit from:
- Accessibility improvements (ARIA labels, keyboard navigation)
- User authentication
- Additional task management features
- Mobile responsiveness enhancements

## 📚 Documentation

- **[README.md](README.md)** - Project overview (you are here)
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[SETUP.md](SETUP.md)** - Detailed setup with troubleshooting
- **[CHECKLIST.md](CHECKLIST.md)** - Setup verification checklist
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
