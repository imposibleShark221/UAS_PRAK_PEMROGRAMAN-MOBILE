import api from '../api/api';

/**
 * Fetch all products from DummyJSON.
 * @returns {Promise<object[]>} array of products
 */
export const fetchProducts = async () => {
  const response = await api.get('/products?limit=100');
  return response.data.products;
};

/**
 * Fetch a single product by ID.
 * @param {number} id
 * @returns {Promise<object>} product object
 */
export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
