import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { App } from '../App';

let mockUser = { uid: 'test-uid' };
const mockSignIn = jest.fn(() => Promise.resolve());

jest.mock('../firebase', () => ({
  firebase: {
    auth: jest.fn(() => ({
      onAuthStateChanged: jest.fn((callback) => {
        callback(mockUser);
        return jest.fn();
      }),
      signInWithPopup: (...args) => mockSignIn(...args),
      signOut: jest.fn(),
    })),
  },
}));

jest.mock('firebase/app', () => ({
  auth: { GoogleAuthProvider: jest.fn() },
}));

jest.mock('../hooks', () => ({
  useTasks: jest.fn(() => ({ tasks: [], archivedTasks: [] })),
  useProjects: jest.fn(() => ({ projects: [], setProjects: jest.fn() })),
}));

beforeEach(() => {
  cleanup();
  mockUser = { uid: 'test-uid' };
  mockSignIn.mockClear();
});

describe('<App />', () => {
  it('renders the application when signed in', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeTruthy();
    expect(queryByTestId('sign-in')).toBeFalsy();
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

  it('shows the sign-in screen instead of the app when signed out', () => {
    mockUser = null;
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeFalsy();
    expect(queryByTestId('sign-in')).toBeTruthy();

    fireEvent.click(queryByTestId('sign-in-button'));
    expect(mockSignIn).toHaveBeenCalledTimes(1);
  });
});
