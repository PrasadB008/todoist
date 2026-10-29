import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';

export const AuthContext = createContext({ user: null, loading: false });

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

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthValue = () => useContext(AuthContext);

export const signInWithGoogle = () =>
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

export const signOut = () => firebase.auth().signOut();

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
