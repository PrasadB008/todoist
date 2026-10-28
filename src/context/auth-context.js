import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';

export const AuthContext = createContext({
  currentUser: null,
  loading: false,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(user => {
        setCurrentUser(user);
        setLoading(false);
      }),
    []
  );

  const signIn = () =>
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  const signOut = () => firebase.auth().signOut();

  return (
    <AuthContext.Provider value={{ currentUser, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthValue = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
