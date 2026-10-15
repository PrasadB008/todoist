# Contributing to Todoist Clone

Thank you for your interest in contributing to this Todoist clone project! 🎉

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/todoist.git
   cd todoist
   ```
3. **Set up the project** - Follow the [SETUP.md](SETUP.md) guide
4. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Set Up Firebase
Follow the instructions in [SETUP.md](SETUP.md) to configure your Firebase connection.

### 3. Run the Development Server
```bash
npm start
# or
yarn start
```

### 4. Run Tests
Before submitting a pull request, make sure all tests pass:
```bash
npm test
# or
yarn test
```

### 5. Code Style
This project uses ESLint and Prettier for code formatting. The configuration is already set up in:
- `.eslintrc.json` - ESLint rules
- `.prettierrc.json` - Prettier formatting rules

Make sure your code follows these standards. Most IDEs can be configured to auto-format on save.

## Project Structure

```
todoist/
├── public/              # Static files (favicon, index.html)
├── src/
│   ├── __tests__/      # Jest test files
│   ├── components/     # React components
│   │   ├── layout/     # Layout components (Header, Content, Sidebar)
│   │   ├── AddProject.js
│   │   ├── AddTask.js
│   │   ├── Checkbox.js
│   │   └── ...
│   ├── constants/      # App constants
│   ├── context/        # React Context providers
│   ├── helpers/        # Helper/utility functions
│   ├── hooks/          # Custom React hooks (useTasks, useProjects)
│   ├── App.js          # Main App component
│   ├── App.scss        # Main SCSS styles
│   └── index.js        # Entry point
└── package.json
```

## Areas for Contribution

The original author has specifically mentioned that **accessibility features** would be a great addition! Here are some ideas:

### High Priority
- **Accessibility improvements** (ARIA labels, keyboard navigation, screen reader support)
- **Mobile responsiveness** enhancements
- **Performance optimizations**
- **Test coverage** improvements

### Feature Ideas
- User authentication (currently uses a hardcoded userId)
- Task priority levels
- Task labels/tags
- Search functionality
- Task notes/descriptions
- Due time (not just date)
- Recurring tasks
- Task sharing/collaboration
- Keyboard shortcuts
- Drag and drop task reordering
- Export/import tasks

### Code Quality
- Refactoring for better code organization
- Adding TypeScript
- Improving error handling
- Adding loading states
- Better form validation

## Testing

This project uses React Testing Library. All components should have corresponding test files in `src/__tests__/`.

### Running Tests
```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

### Test Coverage Requirements
The project has coverage thresholds set at 90% for:
- Branches
- Functions
- Lines
- Statements

## Submitting Changes

1. **Commit your changes** with clear, descriptive commit messages:
   ```bash
   git add .
   git commit -m "Add: keyboard navigation support for task list"
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what changed and why
   - Screenshots (if applicable)
   - Reference to any related issues

## Code Style Guidelines

- Use functional components with hooks (not class components)
- Follow the existing component structure
- Add PropTypes for all components
- Write tests for new components
- Use SCSS for styling (following the existing patterns)
- Keep components small and focused
- Extract reusable logic into custom hooks

## Firebase Usage

The app currently uses a hardcoded userId (`jlIFXIwyAL3tzHMtzRbw`) in `src/hooks/index.js`. This is intentional for the demo, but contributions to add proper authentication would be welcome!

### Collections Used
- **tasks**: Stores all tasks
  - `userId`: String
  - `task`: String (task description)
  - `date`: String (DD/MM/YYYY format or empty)
  - `projectId`: String
  - `archived`: Boolean

- **projects**: Stores user projects
  - `userId`: String
  - `name`: String (project name)
  - `projectId`: String

## Questions?

If you have questions or need help:
1. Check the [SETUP.md](SETUP.md) guide
2. Look through existing issues on GitHub
3. Create a new issue with your question

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's coding standards

Thank you for contributing! 🙏
