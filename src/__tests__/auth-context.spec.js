import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { AuthProvider, useAuthValue } from '../context/auth-context';

let mockAuthCallback;
const mockUnsubscribe = jest.fn();

jest.mock('../firebase', () => ({
  firebase: {
    auth: () => ({
      onAuthStateChanged: (cb) => {
        mockAuthCallback = cb;
        return mockUnsubscribe;
      },
    }),
  },
}));

const Probe = () => {
  const { user, loading } = useAuthValue();
  let text = 'signed-out';
  if (loading) text = 'loading';
  else if (user) text = user.uid;
  return <div data-testid="probe">{text}</div>;
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

    act(() => mockAuthCallback({ uid: 'user-123' }));
    expect(getByTestId('probe').textContent).toBe('user-123');

    act(() => mockAuthCallback(null));
    expect(getByTestId('probe').textContent).toBe('signed-out');
  });

  it('unsubscribes from auth changes on unmount', () => {
    const { unmount } = render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );
    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
