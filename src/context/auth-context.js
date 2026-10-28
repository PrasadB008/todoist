import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';
import { useAuth } from '../hooks';

export const AuthContext = createContext({ user: null, loading: true });

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signOut = () => firebase.auth().signOut();

export const AuthProvider = ({ children }) => {
  const { user, loading } = useAuth();

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthValue = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
