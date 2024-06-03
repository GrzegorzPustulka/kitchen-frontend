import { useEffect } from 'react';
import styles from './UserProfile.module.css';

const UserProfile = ({ userData, onFetchUserData }) => {
  useEffect(() => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const tokenData = JSON.parse(tokenString);
      const userId = tokenData.userId;
      if (userId) {
        onFetchUserData(userId);
      }
    }
  }, [onFetchUserData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.h2_user}>Moje konto</h2>
      <div className={styles.profileDetails}>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Imię:</strong> {userData.firstName}</p>
        <p><strong>Nazwisko:</strong> {userData.lastName}</p>
        <p><strong>Numer telefonu:</strong> {userData.phoneNumber}</p>
        {userData.addresses && userData.addresses.length > 0 && (
          <div className={styles.addresses}>
            {userData.addresses.map((address, index) => (
              <div key={index} className={styles.address}>
                <p><strong>Kraj:</strong> {address.country}</p>
                <p><strong>Miasto:</strong> {address.city}</p>
                <p><strong>Ulica:</strong> {address.street}</p>
                <p><strong>Kod pocztowy:</strong> {address.zipCode}</p>
                <p><strong>Numer domu:</strong> {address.houseNumber}</p>
                <p><strong>Numer mieszkania:</strong> {address.apartmentNumber}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;