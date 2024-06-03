import { createContext, useState, useContext } from 'react';

/*
Stan isAuthenticated: Przechowuje informację o tym, czy użytkownik jest uwierzytelniony, na podstawie obecności tokena w localStorage.
login: Funkcja zapisująca token w localStorage i ustawiająca stan uwierzytelnienia na true.
logout: Funkcja usuwająca token z localStorage i ustawiająca stan uwierzytelnienia na false.
AuthContext.Provider: Dostarcza wartości kontekstu (isAuthenticated, login, logout) do dzieci komponentu.
* */

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const login = (tokenData) => {
    const tokenString = JSON.stringify(tokenData);
    localStorage.setItem('token', tokenString);
    setIsAuthenticated(true);
  };

  const logout = () => {
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
