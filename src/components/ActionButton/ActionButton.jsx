import styles from './ActionButton.module.css';

const ActionButton = ({ label, color, onClick }) => {
  return (
    <button
      className={`${styles.button} ${styles[color]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;