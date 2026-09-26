import { verifyToken } from '../utils/jwt.js';

/**
 * Middleware de autenticación.
 * Lee la cookie currentUser, verifica el JWT y guarda el payload en req.user.
 */
export const auth = (req, res, next) => {
  try {
    const token = req.cookies?.mi_cookie;

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No autenticado'
      });
    }
const decoded=
verifyToken(token);
req.user=decoded
next()

    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Token inválido o expirado'
    });
  }
};
