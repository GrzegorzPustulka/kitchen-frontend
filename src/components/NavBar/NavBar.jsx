import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useAuth } from '../../AuthContext';

const NavBar = ({ onFetchOrder, onFetchUserData }) => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isPersonalUser, setIsPersonalUser] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const tokenData = JSON.parse(tokenString);
      if (tokenData.userType === 'PERSONAL') {
        setIsPersonalUser(true);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFetchUserData = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const tokenData = JSON.parse(tokenString);
      const userId = tokenData.userId;
      if (userId) {
        onFetchUserData(userId);
      }
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>DineStream - Kitchen</div>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        {location.pathname === '/' ? (
          <button className={styles.navItem} onClick={onFetchOrder}>Odbierz zamówienie</button>
        ) : (
          <Link to="/" className={styles.navItem}>Strona główna</Link>
        )}
        {isPersonalUser && (
          <Link to="/me" className={styles.navItem} onClick={handleFetchUserData}>Moje konto</Link>
        )}
        {isAuthenticated ? (
          <button className={styles.navItem} onClick={logout}>Wyloguj</button>
        ) : (
          <>
            <Link to="/login" className={styles.navItem}>Zaloguj</Link>
            <Link to="/register" className={styles.navItem}>Zarejestruj</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
