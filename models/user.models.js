const { Schema, model } = require('mongoose');
const { hashPassword } = require('../utils/auth');


const UserSchema = new Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
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
        enum: ["employee", "admin"],
        default: "employee"
    }
},
    {
        timestamps: true
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await hashPassword(this.password);
    next();
});

module.exports = model('User', UserSchema);
