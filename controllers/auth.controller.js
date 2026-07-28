import { userModel } from '../models/user.model.js'
import { generateToken } from '../utils/jwt.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).json({ status: 'error', message: 'Faltan datos obligatorios' });
    }

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
        return res.status(409).json({ status: 'error', message: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword
    });

    const token = generateToken({ id: newUser._id, email: newUser.email });

    return res.status(201).json({ status: 'success', message: 'Usuario registrado', token });
}