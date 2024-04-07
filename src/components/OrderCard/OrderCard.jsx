import ActionButton from '../ActionButton/ActionButton.jsx';
import TimeAgo from "../TimeAgo/TimeAgo.jsx";
import styles from './OrderCard.module.css';

const OrderCard = ({ order }) => {
  return (
      <div className={styles.orderCard}>
          <h2>Numer zamówienia: {order.id.split('-')[0]}</h2>
          <TimeAgo DateTimeFromApi={order.orderDateTime} prefixText="Czas od złożenia zamówienia:"/>
          <TimeAgo DateTimeFromApi={order.preparationTime} prefixText="Czas przygotowywania:"/>
          <h1>Zamówienie:</h1>
          <ul>
              {order.meals.map((meal, index) => (
                  <li key={index}>{meal.meal}: {meal.count}</li>
              ))}
          </ul>
          <h1>Uwagi:</h1>
          <p>{order.notes}</p>
          <div className={styles.actions}>
              <ActionButton label="PRZEPISY" color="blue"/>
              <ActionButton label="GOTOWE" color="green" onClick={() => { /* Handle click here */
              }}/>
              <ActionButton label="ANULUJ" color="red" onClick={() => { /* Handle click here */
              }}/>
          </div>
      </div>
  );
};

export default OrderCard;
