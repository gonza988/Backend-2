import * as usersDao from '../dao/users.dao.js';

export const create = async (userData) => {
    return await usersDao.createUser(userData);
};

export const getByEmail = async (email) => {
    return await usersDao.findUserByEmail(email);
};

export const getById = async (id) => {
    return await usersDao.findUserById(id);
};