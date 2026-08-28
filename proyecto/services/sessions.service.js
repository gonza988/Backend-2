import * as usersRepository from '../repositories/users.repository.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

/**
 * Registra un nuevo usuario
 * @param {Object} data - { first_name, last_name, email, password }
 */
export const registerUser = async (data) => {
  const { first_name, last_name, email, password } = data;

  // Validar presencia de campos obligatorios
  if (!first_name || !last_name || !email || !password) {
    const error = new Error('Faltan campos obligatorios');
    error.status = 400;
    throw error;
  }

  // Validar formato de email
  const normalizedEmail = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    const error = new Error('Formato de email inválido');
    error.status = 400;
    throw error;
  }

  // Validar longitud mínima de contraseña
  if (password.length < MIN_PASSWORD_LENGTH) {
    const error = new Error(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`);
    error.status = 400;
    throw error;
  }

  // Verificar si el email ya existe
  const existingUser = await usersRepository.getByEmail(normalizedEmail);
  if (existingUser) {
    const error = new Error('El email ya está registrado');
    error.status = 409;
    throw error;
  }

  // Hashear contraseña
  const hashedPassword = await hashPassword(password);

  // Crear usuario (role por defecto "user", no se acepta desde el body)
  const newUser = await usersRepository.create({
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    email: normalizedEmail,
    password: hashedPassword
  });

  return {
    id: newUser._id,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    role: newUser.role
  };
};

/**
 * Login de usuario
 * @param {Object} data - { email, password }
 * @returns {{ token: string, user: Object }}
 */
export const loginUser = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    const error = new Error('Faltan campos obligatorios');
    error.status = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await usersRepository.getByEmail(normalizedEmail);

  // Respuesta genérica para no revelar si el email existe o no
  if (!user) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role
  });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  };
};