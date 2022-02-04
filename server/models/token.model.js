const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

module.exports = model(
    "Token",
    new Schema(
        {
            user: { type: ObjectIdType, ref: "User" },
            refreshToken: {type: String, required: true}
        },
        { timestamps: true }
    )
);
