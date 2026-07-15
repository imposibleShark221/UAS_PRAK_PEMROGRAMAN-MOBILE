import USERS from '../data/users';

/**
 * Login user against local mock user data.
 *
 * NOTE: Previously this called DummyJSON's /auth/login over the network.
 * It now checks credentials against a local user list instead, so login
 * always works, including fully offline.
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object>} user data with a fake accessToken
 * @throws {Error} with a `response.data.message` shape, to stay
 *   compatible with the error handling already in LoginScreen.js
 */
export const loginUser = async (username, password) => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const user = USERS.find(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );

  if (!user || user.password !== password) {
    const error = new Error('Invalid credentials');
    error.response = {
      data: { message: 'Username atau password salah.' },
    };
    throw error;
  }

  const { password: _password, ...userData } = user;

  return {
    ...userData,
    accessToken: `mock-token-${user.id}-${Date.now()}`,
  };
};