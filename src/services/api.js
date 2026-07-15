import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
})

export function sendChatMessage({ sessionId, message, latitude, longitude }) {
  return client
    .post('/chat', { session_id: sessionId, message, latitude, longitude })
    .then((res) => res.data)
}

export function fetchNearbyOutlets({ latitude, longitude, menuItemId }) {
  return client
    .get('/outlets/nearby', {
      params: { latitude, longitude, menu_item_id: menuItemId },
    })
    .then((res) => res.data)
}

export function fetchCart(sessionId) {
  return client.get(`/orders/cart/${sessionId}`).then((res) => res.data)
}

export function placeOrder(payload) {
  return client.post('/orders', payload).then((res) => res.data)
}

export function fetchOrder(orderId) {
  return client.get(`/orders/${orderId}`).then((res) => res.data)
}

export default client
