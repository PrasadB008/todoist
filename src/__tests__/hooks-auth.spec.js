import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { useAuth, useProjects, useTasks } from '../hooks';

let mockAuthCallback;
const mockUnsubscribe = jest.fn();
const mockWhere = jest.fn();

jest.mock('../firebase', () => ({
  firebase: {
    auth: jest.fn(() => ({
      onAuthStateChanged: cb => {
        mockAuthCallback = cb;
        return mockUnsubscribe;
      },
    })),
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        where: (...args) => {
          mockWhere(...args);
          const query = {
            where: () => query,
            orderBy: () => query,
            onSnapshot: () => jest.fn(),
            get: () => Promise.resolve({ docs: [] }),
          };
          return query;
        },
      })),
    })),
  },
}));

beforeEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('useAuth', () => {
  const Probe = () => {
    const { user, loading } = useAuth();
    return (
      <div data-testid="probe">{loading ? 'loading' : (user && user.uid) || 'none'}</div>
    );
  };

  it('starts loading, then exposes the signed-in user', () => {
    const { getByTestId } = render(<Probe />);
    expect(getByTestId('probe').textContent).toBe('loading');

    act(() => mockAuthCallback({ uid: 'abc123' }));
    expect(getByTestId('probe').textContent).toBe('abc123');
  });

  it('reports no user after sign-out and unsubscribes on unmount', () => {
    const { getByTestId, unmount } = render(<Probe />);

    act(() => mockAuthCallback(null));
    expect(getByTestId('probe').textContent).toBe('none');

    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});

describe('queries scoped to the signed-in user', () => {
  const ProjectsProbe = ({ userId }) => {
    useProjects(userId);
    return null;
  };
  const TasksProbe = ({ userId }) => {
    useTasks('INBOX', userId);
    return null;
  };

  it('useProjects queries by the given user id', () => {
    render(<ProjectsProbe userId="abc123" />);
    expect(mockWhere).toHaveBeenCalledWith('userId', '==', 'abc123');
  });

  it('useTasks queries by the given user id', () => {
    render(<TasksProbe userId="abc123" />);
    expect(mockWhere).toHaveBeenCalledWith('userId', '==', 'abc123');
  });

  it('does not query anything without a user', () => {
    render(<ProjectsProbe userId={null} />);
    render(<TasksProbe userId={null} />);
    expect(mockWhere).not.toHaveBeenCalled();
  });
});
