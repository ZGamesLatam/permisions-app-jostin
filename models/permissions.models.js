
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
        attachment: {
            data: Buffer, // Campo para almacenar el contenido del archivo
            contentType: String, // Tipo MIME del archivo
            originalName: String, // Nombre original del archivo
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
