
import { verifyToken } from '../utils/jwt.js';

/**
 * Middleware de autenticación.
 * Lee la cookie `currentUser` (la misma que setea el login), verifica el
 * JWT y guarda el payload decodificado en req.user.
 */
export const auth = (req, res, next) => {
  try {
    const token = req.cookies?.currentUser;

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No autenticado',
      });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Token inválido o expirado',
    });
  }
};