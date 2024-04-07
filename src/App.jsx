import { useState, useEffect } from 'react';
import './App.css';
import OrderCard from './components/OrderCard/OrderCard.jsx';
import styles from './components/OrderCard/OrderCard.module.css' // TODO: to bedzie trzeba zmienic xd
import { fetchOrders, fetchOrder } from './api/orders';
import NavBar from "./components/NavBar/NavBar.jsx";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFetchOrder = async () => {
    try {
      const newOrder = await fetchOrder();
      setOrders(prevOrders => [...prevOrders, newOrder]); // Dodajemy nowe zamówienie do listy
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app">
      <NavBar onFetchOrder={handleFetchOrder} />
      <div className={styles.cardsContainer}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default App;

