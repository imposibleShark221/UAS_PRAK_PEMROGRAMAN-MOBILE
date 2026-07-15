/**
 * Local mock user data for login (replaces DummyJSON /auth/login).
 * Keeps the same demo credentials shown on the Login screen so nothing
 * else needs to change: username "emilys", password "emilyspass".
 */
const USERS = [
  {
    id: 1,
    username: 'emilys',
    password: 'emilyspass',
    email: 'emily.johnson@kampusmarket.id',
    firstName: 'Emily',
    lastName: 'Johnson',
  },
  {
    id: 2,
    username: 'michaelw',
    password: 'michaelwpass',
    email: 'michael.williams@kampusmarket.id',
    firstName: 'Michael',
    lastName: 'Williams',
  },
];

export default USERS;