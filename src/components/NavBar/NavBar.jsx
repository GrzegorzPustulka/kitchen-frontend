import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useAuth } from '../../AuthContext';

const NavBar = ({ onFetchOrder }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <button className={styles.navItem} onClick={onFetchOrder}>Odbierz zamówienie</button>
        <Link to="/magazyn" className={styles.navItem}>Magazyn</Link>
        <Link to="/moje-konto" className={styles.navItem}>Moje konto</Link>
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
