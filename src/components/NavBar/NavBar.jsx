import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useAuth } from '../../AuthContext';

const NavBar = ({ onFetchOrder }) => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        <button className={styles.navItem} onClick={onFetchOrder}>Odbierz zamówienie</button>
        <Link to="/recipes" className={styles.navItem}>Przepisy</Link>
        <Link to="/me" className={styles.navItem}>Moje konto</Link>
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
