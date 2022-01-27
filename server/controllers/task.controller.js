var Service = require("../services/task.service");

exports.getList = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    let page = req.params.page ? req.params.page : 1;
    let limit = req.params.limit ? req.params.limit : 10;
    const user = req.userId;
    try {
        var tasks = await Service.getList({user}, page, limit);
        return res.status(200).json({
            status: 200,
            content: tasks,
            message: "Succesfully tasks Retrieved",
        });
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};
exports.get = async function (req, res, next) {
    const {id} = req.params;
    const user = req.userId;
    try {
        const task = await Service.get(id);
        if (task.user.toString() !== user) return res.status(403).json({status: 403, message: 'Нет доступа'});
        return res.status(200).json({
            status: 200,
            content: task,
            message: "Succesfully task Retrieved",
        });
    } catch (e) {
        return res.status(404).json({status: 404, message: e.message});
    }
};
exports.update = async function (req, res, next) {
    const {id} = req.params;
    const user = req.userId;
    try {
        const prevTask = await Service.get(id);
        if (prevTask.user.toString() !== user) return res.status(403).json({status: 403, message: 'Нет доступа'});
        const task = await Service.update(id, req.body);
        return res.status(200).json({
            status: 200,
            content: task,
            message: "Succesfully updated",
        });
    } catch (e) {
        return res.status(404).json({status: 404, message: e.message});
    }
};
exports.add = async function (req, res, next) {
    try {
        const task = await Service.add({...req.body, user: req.userId});
        return res.status(200).json({
            status: 200,
            content: {task},
            message: "Succesfully created",
        });
    } catch (e) {
        return res.status(400).json({status: 404, message: e.message});
    }
};
exports.delete = async function (req, res, next) {
    const {id} = req.params;
    const user = req.userId;
    try {
        const prevTask = await Service.get(id);
        if (prevTask.user.toString() !== user) return res.status(403).json({status: 403, message: 'Нет доступа'});
        const task = await Service.delete(id);
        return res.status(200).json({
            status: 200,
            content: task,
            message: "Succesfully deleted",
        });
    } catch (e) {
        return res.status(404).json({status: 404, message: e.message});
    }
};
