const Model = require("../models/task.model");
exports.get = async function (id) {
    try {
        const data = await Model.findById(id);
        return data;
    } catch (error) {
        throw Error("Model not found");
    }
};

exports.update = async function (id, dataUpdate) {
    try {
        const data = await Model.findByIdAndUpdate(id, dataUpdate, {
            new: true,
        });
        console.log(data);
        return data;
    } catch (error) {
        throw Error("Model not found");
    }
};
exports.add = async function (data) {
    try {
        const model = new Model(data);
        await model.save();
        return model;
    } catch (error) {
        throw Error(error);
    }
};
exports.delete = async function (id) {
    try {
        const model = await Model.findByIdAndDelete(id);
        if (model === null) {
            throw Error("Not found");
        }
        return model;
    } catch (error) {
        throw Error("Model Not Found");
    }
};

exports.getList = async function (query, page, limit) {
    try {
        const data = await Model.find(query);
        return data;
    } catch (e) {
        // Log Errors
        throw Error("Error while Paginating Qualities");
    }
};
