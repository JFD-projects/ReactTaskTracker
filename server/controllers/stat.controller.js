var TaskService = require("../services/task.service");
var ColumnService = require("../services/column.service");

exports.getTasksStat = async (req, res) => {
  let columns = await ColumnService.getList();
  columns = await Promise.all(
    columns.map(async (column) => ({
      ...column.toObject(),
      tasksCount: await TaskService.getCountDocuments({ column: column._id }),
    }))
  );
  const allTasksCount = await TaskService.getCountDocuments();
  try {
    return res.send({
      status: 200,
      content: {
        allTasksCount,
        columns,
      },
      message: "Succesfully stat tasks retrieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
