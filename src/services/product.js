import PRODUCTS from '../data/products';

/**
 * Fetch all products.
 *
 * NOTE: Previously this called the DummyJSON API over the network, which
 * was unreliable depending on the user's network/firewall/DNS. It now
 * reads from local mock data instead, so it always works, including
 * fully offline. The `await` + setTimeout keeps the same async shape
 * (and a tiny simulated delay) so loading states in the UI still work
 * as expected.
 *
 * @returns {Promise<object[]>} array of products
 */
export const fetchProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return PRODUCTS;
};