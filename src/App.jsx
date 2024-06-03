import { useState, useEffect } from 'react';
import './App.css';
import OrderCard from './components/OrderCard/OrderCard.jsx';
import styles from './components/OrderCard/OrderCard.module.css';
import { fetchOrders, fetchOrder, deleteOrder, fetchUserData } from './api/orders';
import NavBar from "./components/NavBar/NavBar.jsx";
import Login from "./components/Login/Login.jsx";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Register from './components/Register/Register.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

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
      setOrders(prevOrders => [...prevOrders, newOrder]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFetchUserData = async (userId) => {
    try {
      const data = await fetchUserData(userId);
      setUserData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteOrder = async (orderId, status) => {
    try {
      await deleteOrder(orderId, status);
      const updatedOrders = await fetchOrders();
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
          <ConditionalNavBar onFetchOrder={handleFetchOrder} onFetchUserData={handleFetchUserData} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><OrderList orders={orders} onDeleteOrder={handleDeleteOrder} /></ProtectedRoute>} />
            <Route path="/me" element={<ProtectedRoute><UserProfile userData={userData} onFetchUserData={handleFetchUserData} /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

const ConditionalNavBar = ({ onFetchOrder, onFetchUserData }) => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/login' || location.pathname === '/register';
  return !hideNavBar && <NavBar onFetchOrder={onFetchOrder} onFetchUserData={onFetchUserData} />;
};

const OrderList = ({ orders, onDeleteOrder }) => (
  <div className={styles.cardsContainer}>
    {orders.map((order) => (
      <OrderCard key={order.id} order={order} onDeleteOrder={onDeleteOrder} />
    ))}
  </div>
);

// Komponent chronionego trasy, przekierowujący na stronę logowania, jeśli użytkownik nie jest uwierzytelniony
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
