import { userModel } from '../models/user.model.js';

export const createUser = async (userData) => {
    return await userModel.create(userData);
};

export const findUserByEmail = async (email) => {
    return await userModel.findByEmail(email);
};

export const findUserById = async (id) => {
    return await userModel.findById(id);
};