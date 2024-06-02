import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import { useAuth } from '../../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8080/kitchen/employees/login', {
        email,
        password,
      });
      const tokenData = response.data;
      console.log('Received token data:', tokenData); // Log the received token data

      if (tokenData && tokenData.jwt) {
        login(tokenData);
        navigate('/');
      } else {
        setError('Token is not received.');
      }
    } catch (error) {
      console.error('Login error:', error); // Log any login errors
      setError('Nieprawidłowy email lub hasło.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Logowanie</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label>Hasło:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Zaloguj</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
