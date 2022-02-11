const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

module.exports = model(
    "Task",
    new Schema(
        {
            title: { type: String, required: true },
            deadLine: { type: String},
            responsible: { type: String},
            text: { type: String},
            column: { type: ObjectIdType, ref: "Column" },
            user: { type: ObjectIdType, ref: "User" },
            sort: { type: "Number", required: true },
        },
        { timestamps: true }
    )
);
