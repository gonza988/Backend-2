import * as sessionsService from '../services/sessions.service.js';

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 3600000, // 1 hora
  secure: isProduction
};

export const register = async (req, res) => {
  try {
    const user = await sessionsService.registerUser(req.body);

    res.status(201).json({
      status: 'success',
      payload: user
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      status: 'error',
      message: error.message || 'Error interno del servidor'
    });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await sessionsService.loginUser(req.body);

    res.cookie('currentUser', token, cookieOptions);

    res.status(200).json({
      status: 'success',
      payload: user
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      status: 'error',
      message: error.message || 'Error interno del servidor'
    });
  }
};

export const current = async (req, res) => {
  // req.user ya viene del middleware auth
  res.status(200).json({
    status: 'success',
    payload: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
};

export const logout = async (req, res) => {
  res.clearCookie('currentUser', {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction
  });

  res.status(200).json({
    status: 'success',
    message: 'Sesión cerrada correctamente' 
  });
};