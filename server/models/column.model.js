const { Schema, model } = require("mongoose");

module.exports = model(
    "Column",
    new Schema(
        {
            title: { type: String, required: true },
            color: { type: String, required: true },
            sort: { type: "Number", required: true },
        },
        { timestamps: true }
    )
);
