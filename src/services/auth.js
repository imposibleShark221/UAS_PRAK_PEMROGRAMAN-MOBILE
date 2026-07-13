import api from '../api/api';

/**
 * Login user via DummyJSON auth endpoint.
 * @param {string} username - DummyJSON uses username (we map email to username)
 * @param {string} password
 * @returns {Promise<object>} user data with token
 */
export const loginUser = async (username, password) => {
  const response = await api.post('/auth/login', {
    username,
    password,
    expiresInMins: 60,
  });
  return response.data;
};
