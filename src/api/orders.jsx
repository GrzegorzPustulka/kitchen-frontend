import axios from "axios";

export async function fetchOrders() {
  const response = await fetch('http://127.0.0.1:8080/kitchen/orders/all');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function fetchOrder() {
  const response = await fetch('http://127.0.0.1:8080/kitchen/orders/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function deleteOrder(orderId, status) {
  const response = await fetch(`http://127.0.0.1:8080/kitchen/orders/${orderId}?status=${status}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
}

export const fetchUserData = async (userId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`http://127.0.0.1:8080/kitchen/employees/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};