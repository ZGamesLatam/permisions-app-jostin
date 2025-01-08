// models/permission.model.js
const { Schema, model } = require('mongoose');

const PermissionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        permissionTypeId: {
            type: Schema.Types.ObjectId,
            ref: 'PermissionType',
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        attachments: {
            type: [String],
            default: []
        },
        status: {
            type: String,
            enum: ['Pendiente', 'Aprobado', 'Rechazado'],
            default: 'Pendiente'
        },
        reasonForRejection: {
            type: String,
            default: null
        },
        approvedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Permission', PermissionSchema);
