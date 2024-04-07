export async function fetchOrders() {
  const response = await fetch('http://127.0.0.1:8000/kitchen/orders/all');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function fetchOrder() {
  const response = await fetch('http://127.0.0.1:8000/kitchen/orders/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}