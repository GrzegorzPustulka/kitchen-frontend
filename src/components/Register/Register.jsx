import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    birthDate: new Date(),
    zipCode: '',
    city: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    country: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleDateChange = (date) => {
    setForm((prevForm) => ({ ...prevForm, birthDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8080/kitchen/employees/register', form);
      navigate('/login');
    } catch (error) {
      setError('Rejestracja nie powiodła się. Spróbuj ponownie.');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2>Rejestracja</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required/>
          </div>
          <div className={styles.formGroup}>
            <label>Hasło:</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required/>
          </div>
          <div className={styles.formGroup}>
            <label>Imię:</label>
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required/>
          </div>
          <div className={styles.formGroup}>
            <label>Nazwisko:</label>
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required/>
          </div>
          <div className={styles.formGroup}>
            <label>Numer telefonu:</label>
            <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required/>
          </div>
          <div className={styles.formGroup}>
            <label>Data urodzenia:</label>
            <DatePicker
                selected={form.birthDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className={styles.datePicker}
                wrapperClassName={styles.customDatePickerWraper}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Kod pocztowy:</label>
            <input type="text" name="zipCode" value={form.zipCode} onChange={handleChange} required/>
          </div>
          <div className={styles.formGroup}>
            <label>Miasto:</label>
            <input type="text" name="city" value={form.city} onChange={handleChange} required/>
          </div>
          <div className={styles.formGroup}>
            <label>Ulica:</label>
            <input type="text" name="street" value={form.street} onChange={handleChange} required/>
          </div>
          <div className={styles.formGroup}>
            <label>Numer domu:</label>
            <input type="text" name="houseNumber" value={form.houseNumber} onChange={handleChange} required/>
          </div>
          <div className={styles.formGroup}>
            <label>Numer mieszkania:</label>
            <input type="number" name="apartmentNumber" value={form.apartmentNumber} onChange={handleChange}/>
          </div>
          <div className={styles.formGroup}>
            <label>Kraj:</label>
            <input type="text" name="country" value={form.country} onChange={handleChange} required/>
          </div>
          <button type="submit">Zarejestruj</button>
          <button type="button" onClick={() => navigate('/login')}>Zaloguj się</button>

        </form>
      </div>
    </div>
  );
};

export default Register;
