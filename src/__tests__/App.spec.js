import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup); // clean meeeeeeeeee!

jest.mock('../context/auth-context', () => ({
  AuthProvider: ({ children }) => children,
  useAuthValue: () => ({ user: null, loading: false }),
  signInWithGoogle: jest.fn(),
  signOut: jest.fn(),
}));

describe('<App />', () => {
  it('shows the sign-in screen when nobody is signed in', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('sign-in')).toBeTruthy();
    expect(queryByTestId('sign-in-action')).toBeTruthy();
  });

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
});
