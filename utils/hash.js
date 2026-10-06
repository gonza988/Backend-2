import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hashea una contraseña en texto plano.
 * @param {string} password
 * @returns {Promise<string>} hash
 */
export const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compara una contraseña en texto plano contra un hash guardado.
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};