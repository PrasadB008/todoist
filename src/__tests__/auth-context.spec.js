import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { AuthProvider, useAuthValue } from '../context/auth-context';

let authCallback;
const unsubscribe = jest.fn();

jest.mock('../firebase', () => ({
  firebase: {
    auth: () => ({
      onAuthStateChanged: (cb) => {
        authCallback = cb;
        return unsubscribe;
      },
    }),
  },
}));

const Probe = () => {
  const { user, loading } = useAuthValue();
  return (
    <div data-testid="probe">
      {loading ? 'loading' : user ? user.uid : 'signed-out'}
    </div>
  );
};

describe('<AuthProvider />', () => {
  afterEach(cleanup);

  it('exposes the signed-in user uid and signed-out state', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    expect(getByTestId('probe').textContent).toBe('loading');

    act(() => authCallback({ uid: 'user-123' }));
    expect(getByTestId('probe').textContent).toBe('user-123');

    act(() => authCallback(null));
    expect(getByTestId('probe').textContent).toBe('signed-out');
  });

  it('unsubscribes from auth changes on unmount', () => {
    const { unmount } = render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );
    unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });
});
