import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { UserProvider, useUserValue } from '../context/user-context';

const mockSignInAnonymously = jest.fn(() => Promise.resolve());
let mockAuthCallback;

jest.mock('../firebase', () => ({
  firebase: {
    auth: jest.fn(() => ({
      onAuthStateChanged: jest.fn(cb => {
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

    mockAuthCallback(null);

    expect(mockSignInAnonymously).toHaveBeenCalled();
    expect(getByTestId('user-id').textContent).toBe('none');
  });

  it('exposes the uid of the signed-in user', async () => {
    const { getByTestId } = render(
      <UserProvider>
        <ShowUser />
      </UserProvider>
    );

    mockAuthCallback({ uid: 'abc123' });

    await waitFor(() =>
      expect(getByTestId('user-id').textContent).toBe('abc123')
    );
    expect(mockSignInAnonymously).not.toHaveBeenCalled();
  });
});
