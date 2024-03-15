import React, { createContext, useContext, useState, useEffect } from 'react';
import apiInstance from '../../../API';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ role: '', commune: '' });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiInstance.get('user/');
        setCurrentUser({ role: response.role, commune: response.commune });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      {children}
    </UserContext.Provider>
  );
};
