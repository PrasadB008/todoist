import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AuthGate } from '../components/AuthGate';
import { useAuthValue } from '../context/auth-context';

jest.mock('../context/auth-context', () => ({
  useAuthValue: jest.fn(),
}));

beforeEach(cleanup);

describe('<AuthGate />', () => {
  it('shows a loading state while auth is resolving', () => {
    useAuthValue.mockImplementation(() => ({
      currentUser: null,
      loading: true,
    }));
    const { queryByTestId } = render(
      <AuthGate>
        <p data-testid="private">secret</p>
      </AuthGate>
    );

    expect(queryByTestId('auth-loading')).toBeTruthy();
    expect(queryByTestId('private')).toBeFalsy();
  });

  it('shows the sign-in screen and calls signIn when signed out', () => {
    const signIn = jest.fn();
    useAuthValue.mockImplementation(() => ({
      currentUser: null,
      loading: false,
      signIn,
    }));
    const { queryByTestId } = render(
      <AuthGate>
        <p data-testid="private">secret</p>
      </AuthGate>
    );

    expect(queryByTestId('sign-in')).toBeTruthy();
    expect(queryByTestId('private')).toBeFalsy();

    fireEvent.click(queryByTestId('sign-in-action'));
    expect(signIn).toHaveBeenCalled();
  });

  it('renders its children when a user is signed in', () => {
    useAuthValue.mockImplementation(() => ({
      currentUser: { uid: 'test-user' },
      loading: false,
    }));
    const { queryByTestId } = render(
      <AuthGate>
        <p data-testid="private">secret</p>
      </AuthGate>
    );

    expect(queryByTestId('private')).toBeTruthy();
    expect(queryByTestId('sign-in')).toBeFalsy();
  });
});
