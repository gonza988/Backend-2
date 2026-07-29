import { verifyToken } from '../utils/jwt.js';

/**
 * Middleware de autenticación.
 * Lee la cookie currentUser, verifica el JWT y guarda el payload en req.user.
 */
export const auth = (req, res, next) => {
  try {
    const token = req.cookies?.currentUser;

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No autenticado'
      });
    }

    const payload = verifyToken(token);
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Token inválido o expirado'
    });
  }
};