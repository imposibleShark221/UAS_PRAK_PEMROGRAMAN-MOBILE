import api from '../api/api';

/**
 * Fetch all carts (orders) belonging to a user.
 * DummyJSON endpoint: GET /users/{userId}/carts
 * Each cart contains an array of products with quantities and totals.
 * @param {number} userId
 * @returns {Promise<object[]>} array of cart/order objects
 */
export const fetchUserOrders = async (userId) => {
  const response = await api.get(`/users/${userId}/carts`);
  return response.data.carts || [];
};
