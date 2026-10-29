import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebaseNamespace from 'firebase/app';
import { firebase } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }),
    []
  );

  const signIn = () =>
    firebase
      .auth()
      .signInWithPopup(new firebaseNamespace.auth.GoogleAuthProvider());
  const signOut = () => firebase.auth().signOut();

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthValue = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
