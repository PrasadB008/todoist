import React from 'react';
import PropTypes from 'prop-types';
import { useAuthValue } from '../context/auth-context';

export const AuthGate = ({ children }) => {
  const { currentUser, loading, signIn } = useAuthValue();

  if (loading) return <div data-testid="auth-loading">Loading...</div>;

  if (!currentUser) {
    return (
      <div className="sign-in" data-testid="sign-in">
        <h1>Todoist</h1>
        <button type="button" data-testid="sign-in-action" onClick={signIn}>
          Sign in with Google
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

AuthGate.propTypes = {
  children: PropTypes.node.isRequired,
};
