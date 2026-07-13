/**
 * Validates email format using regex.
 * @param {string} email
 * @returns {string|null} error message or null if valid
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') return 'Email wajib diisi';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) return 'Format email tidak valid';
  return null;
};

/**
 * Validates password length.
 * @param {string} password
 * @returns {string|null} error message or null if valid
 */
export const validatePassword = (password) => {
  if (!password || password === '') return 'Password wajib diisi';
  if (password.length < 6) return 'Password minimal 6 karakter';
  return null;
};

/**
 * Validates that two passwords match.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {string|null} error message or null if valid
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword === '') return 'Konfirmasi password wajib diisi';
  if (password !== confirmPassword) return 'Password tidak cocok';
  return null;
};

/**
 * Validates a name field is non-empty.
 * @param {string} name
 * @returns {string|null} error message or null if valid
 */
export const validateName = (name) => {
  if (!name || name.trim() === '') return 'Nama wajib diisi';
  return null;
};
