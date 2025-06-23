import React, { createContext, useContext, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();

  const handleTokenExpired = useCallback(() => {
    navigation.navigate('Welcome');
  }, [navigation]);

  return (
    <AuthContext.Provider value={{ handleTokenExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
