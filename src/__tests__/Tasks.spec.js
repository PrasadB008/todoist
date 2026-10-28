import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { useSelectedProjectValue } from '../context';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott',
      },
      {
        name: '🚀 DAILY',
        projectId: '2',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'daily-office',
      },
      {
        name: '🎯 FUTURE',
        projectId: '3',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'wake-up',
      },
      {
        name: '📚 WORDS',
        projectId: '4',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'arcade-fire',
      },
      {
        name: '🎵 MUSIC',
        projectId: '5',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'bella-ciao',
      },
    ],
  })),
}));

jest.mock('../hooks', () => ({
  useTasks: () => ({
    archivedTasks: [{ id: 'done1', archived: true, task: 'Done task' }],
    tasks: [
      {
        id: 'mx2taaXpF38vYqMGbVtY',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task:
          'Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      },
    ],
  }),
}));

beforeEach(cleanup);

const mockBatchDelete = jest.fn();
const mockBatchCommit = jest.fn(() => Promise.resolve());

jest.mock('../firebase', () => ({
  firebase: {
    firestore: () => ({
      collection: () => ({ doc: (id) => ({ id }) }),
      batch: () => ({
        delete: (...args) => mockBatchDelete(...args),
        commit: () => mockBatchCommit(),
      }),
    }),
  },
}));

describe('<Tasks />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders tasks', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => 'INBOX'),
      selectedProject: 'INBOX',
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Inbox');
  });

  it('renders a task with a project title', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => '1'),
      selectedProject: '1',
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('🙌 THE OFFICE');
  });

  it('clears all completed tasks with the button', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => 'INBOX'),
      selectedProject: 'INBOX',
    }));

    const { getByTestId } = render(<Tasks />);
    fireEvent.click(getByTestId('clear-completed'));
    expect(mockBatchDelete).toHaveBeenCalledTimes(1);
    expect(mockBatchDelete).toHaveBeenCalledWith({ id: 'done1' });
    expect(mockBatchCommit).toHaveBeenCalledTimes(1);
  });

  it('renders a task with a collated title', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => 'INBOX'),
      selectedProject: 'INBOX',
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Inbox');
  });
});
