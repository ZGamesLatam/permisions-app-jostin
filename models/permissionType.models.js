
const { Schema, model } = require('mongoose');

const PermissionTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: ''
        },
        minDays: {
            type: Number,
            default: 0
        },
        maxDays: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('PermissionType', PermissionTypeSchema);
