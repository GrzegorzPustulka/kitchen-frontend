import styles from './NavBar.module.css';

const NavBar = ({onFetchOrder}) => {

  return (
    <nav className={styles.navbar}>
        <div className={styles.navLinks}>
            <button className={styles.navItem} onClick={onFetchOrder}>Odbierz zamówienie</button>
            <button className={styles.navItem}>Magazyn</button>
            <button className={styles.navItem}>Moje konto</button>
            <button className={styles.navItem}>Wyloguj</button>
        </div>
    </nav>
  );
};

export default NavBar;