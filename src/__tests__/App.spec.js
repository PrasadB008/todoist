import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { App } from '../App';
import { useAuth } from '../hooks';

jest.mock('../firebase', () => ({
  firebase: {
    auth: Object.assign(jest.fn(() => ({})), {
      GoogleAuthProvider: jest.fn(),
    }),
    firestore: jest.fn(),
  },
}));

jest.mock('../hooks', () => ({
  useAuth: jest.fn(),
  useProjects: jest.fn(() => ({ projects: [], setProjects: jest.fn() })),
  useTasks: jest.fn(() => ({ tasks: [], archivedTasks: [] })),
}));

beforeEach(() => {
  cleanup();
  useAuth.mockReturnValue({ user: { uid: 'test-user-uid' }, loading: false });
});

describe('<App />', () => {
  it('renders the application', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeTruthy();
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeFalsy();
  });

  it('renders the application using dark mode', () => {
    const { queryByTestId } = render(<App darkModeDefault />);
    expect(queryByTestId('application')).toBeTruthy();
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeTruthy();
  });

  it('renders nothing while auth state is loading', () => {
    useAuth.mockReturnValue({ user: null, loading: true });
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeFalsy();
    expect(queryByTestId('sign-in')).toBeFalsy();
  });

  it('shows the sign-in screen when nobody is signed in', () => {
    useAuth.mockReturnValue({ user: null, loading: false });
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeFalsy();
    expect(queryByTestId('sign-in')).toBeTruthy();
  });
});
