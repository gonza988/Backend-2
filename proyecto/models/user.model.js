// models/user.model.js
import bcrypt from 'bcrypt';
import {objectId} from 'mongodb';
import getDb from '../config/database.js';
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export const userModel = {
    findByEmail: async (email) => {
        return await User.findOne({ email })
    },
    create: async (userData) => {
        return await User.create(userData)
    }
} 