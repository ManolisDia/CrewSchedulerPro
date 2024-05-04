import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const savedUserInfo = await AsyncStorage.getItem('userInfo');
        if (savedUserInfo) {
          const parsedInfo = JSON.parse(savedUserInfo);
          console.log('Loaded user info:', parsedInfo);
          setUserInfo(parsedInfo);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to load user info:', error);
      }
    };

    loadUserInfo();
  }, []);

  const login = async (user) => {
    console.log('Logging in with user:', user);
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      setUserInfo(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to save user info:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      setUserInfo(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Failed to clear user info:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
