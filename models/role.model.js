const { Schema, model } = require("mongoose");

const RoleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Role", RoleSchema);
