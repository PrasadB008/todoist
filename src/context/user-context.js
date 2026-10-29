import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';

export const UserContext = createContext({ userId: null });

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = firebase.auth();

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        // Each browser gets its own anonymous user, so data is not shared.
        auth.signInAnonymously().catch(() => setUserId(null));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export const useUserValue = () => useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
