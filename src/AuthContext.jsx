import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const login = (tokenData) => {
    const tokenString = JSON.stringify(tokenData);
    console.log('Saving token to localStorage:', tokenString); // Log the token being saved
    localStorage.setItem('token', tokenString);
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log('Removing token from localStorage'); // Log the token removal
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
