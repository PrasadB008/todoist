import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { UserProvider, useUserValue } from '../context/user-context';

const mockSignInAnonymously = jest.fn(() => Promise.resolve());
let mockAuthCallback;

jest.mock('../firebase', () => ({
  firebase: {
    auth: jest.fn(() => ({
      onAuthStateChanged: jest.fn((cb) => {
        mockAuthCallback = cb;
        return jest.fn();
      }),
      signInAnonymously: (...args) => mockSignInAnonymously(...args),
    })),
  },
}));

const ShowUser = () => {
  const { userId } = useUserValue();
  return <div data-testid="user-id">{userId || 'none'}</div>;
};

describe('<UserProvider />', () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('signs in anonymously when there is no user', () => {
    const { getByTestId } = render(
      <UserProvider>
        <ShowUser />
      </UserProvider>
    );

    act(() => {
      mockAuthCallback(null);
    });

    expect(mockSignInAnonymously).toHaveBeenCalled();
    expect(getByTestId('user-id').textContent).toBe('none');
  });

  it('exposes the uid of the signed-in user', () => {
    const { getByTestId } = render(
      <UserProvider>
        <ShowUser />
      </UserProvider>
    );

    act(() => {
      mockAuthCallback({ uid: 'abc123' });
    });

    expect(getByTestId('user-id').textContent).toBe('abc123');
    expect(mockSignInAnonymously).not.toHaveBeenCalled();
  });
});
