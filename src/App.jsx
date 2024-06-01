 import { useState, useEffect } from 'react';
import './App.css';
import OrderCard from './components/OrderCard/OrderCard.jsx';
import styles from './components/OrderCard/OrderCard.module.css' // TODO: to bedzie trzeba zmienic xd
import {fetchOrders, fetchOrder, deleteOrder} from './api/orders';
import NavBar from "./components/NavBar/NavBar.jsx";
import Login from "./components/Login/Login.jsx";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Register from './components/Register/Register.jsx';

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

  const handleDeleteOrder = async (orderId, status) => {
  try {
    await deleteOrder(orderId, status);
    const updatedOrders = await fetchOrders(); // Ponownie ładujesz zamówienia, aby odzwierciedlić zmiany
    setOrders(updatedOrders);
  } catch (error) {
    setError(error.message);
  }
};

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <ConditionalNavBar onFetchOrder={handleFetchOrder} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><OrderList orders={orders} onDeleteOrder={handleDeleteOrder} /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

const ConditionalNavBar = ({ onFetchOrder }) => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/login' || location.pathname === '/register';
  return !hideNavBar && <NavBar onFetchOrder={onFetchOrder} />;
};

const OrderList = ({ orders, onDeleteOrder }) => (
  <div className={styles.cardsContainer}>
    {orders.map((order) => (
      <OrderCard key={order.id} order={order} onDeleteOrder={onDeleteOrder} />
    ))}
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};
export default App;