import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

/**
 * Genera un JWT con el payload indicado
 * @param {Object} payload - { id, email, role }
 * @returns {string}
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verifica y decodifica un JWT
 * @param {string} token
 * @returns {Object} payload decodificado
 * @throws si el token es inválido o expirado
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};