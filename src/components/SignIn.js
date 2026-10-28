import React from 'react';
import { useAuthValue } from '../context';

export const SignIn = () => {
  const { signInWithGoogle } = useAuthValue();

  return (
    <main className="sign-in" data-testid="sign-in">
      <h1>Todoist</h1>
      <button
        type="button"
        data-testid="sign-in-google"
        onClick={() => signInWithGoogle()}
      >
        Sign in with Google
      </button>
    </main>
  );
};
