var Service = require("../services/column.service");

exports.getList = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;
    try {
        var items = await Service.getList({}, page, limit);
        return res.status(200).json({
            status: 200,
            content: items,
            message: "Succesfully items Retrieved",
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

