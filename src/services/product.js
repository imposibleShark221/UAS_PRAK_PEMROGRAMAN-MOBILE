import api from '../api/api';

/**
 * Fetch all products from DummyJSON.
 * @returns {Promise<object[]>} array of products
 */
export const fetchProducts = async () => {
  const response = await api.get('/products?limit=100');
  return response.data.products;
};

