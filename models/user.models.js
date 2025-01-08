// models/user.model.js
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['employee', 'admin'],
            default: 'employee'
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('User', UserSchema);
