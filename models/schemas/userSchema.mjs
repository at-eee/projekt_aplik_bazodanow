import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: [true, 'Username in not unique!!!']
    },
    email: {
        type: String,
        required: true,
        match: /^[^@]+@[^@]+\.[^@]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: [3, 'Password is too short!!! (minimum 3 characters long)']
    }
});