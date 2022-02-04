const mongoose = require("mongoose");
const debug = require("debug")("server:db");
const chalk = require("chalk");
const dbConfig = require("../config/db.config");
const models = require("../models");
const bcrypt = require("bcryptjs");

const columnsMock = require("../mockData/columns.json");
const tasksMock = require("../mockData/tasks.json");
const usersMock = require("../mockData/users.json");
const e = require("express");

const generateSimpleEntity = async (data, model) => {
    await model.collection.drop();
    return Promise.all(
        data.map(async (example) => {
            try {
                const exm = await model.find({
                    name: example.name,
                });
                if (exm.length !== 0) {
                    return exm[0];
                }
                delete example._id;
                const newExm = new model(example);
                await newExm.save();
                return newExm;
            } catch (error) {
                return error;
            }
        })
    );
};
// const generateUsers=(data,model)=>{

// }
const findUser = (email, users) => {
    return users.find((row) => row.email === email)._id;
};
const findColumn = (title, columns) => {
    return columns.find((row) => row.title === title)._id;
};

async function setInitialData() {
    const columnsData = await generateSimpleEntity(
        columnsMock,
        models.column
    );
    if (columnsData) {
        debug(`Columns in DB ${chalk.green("✓")}`);
    } else {
        debug(`Columns error ${chalk.red("x")}`);
    }

    const salt = await bcrypt.genSalt(5);
    const users = await Promise.all(usersMock.map(async obj => ({
        ...obj, password: await bcrypt.hash(obj.password, salt)
    })));

    const usersData = await generateSimpleEntity(
        users,
        models.user
    );
    if (usersData) {
        debug(`Users in DB ${chalk.green("✓")}`);
    } else {
        debug(`Users error ${chalk.red("x")}`);
    }

    const tasks = await Promise.all(
        tasksMock.map(async (taskData) => {
            try {
                taskData.user = findUser(taskData.user, usersData);
                taskData.column = findColumn(taskData.column, columnsData);
                const newTask = new models.task(taskData);
                const result = await newTask.save();
                return newTask;
            } catch (error) {
                console.error(error)
                return error;
            }
        })
    );
    if (tasks) {
        debug(`Tasks in DB ${chalk.green("✓")}`);
    } else {
        debug(`Tasks error ${chalk.green("x")}`);
    }
}

module.exports = function () {
    mongoose.connect(
        `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
    );
    var db = mongoose.connection;
    db.on(
        "error",
        console.error.bind(console, `${chalk.green("x")} connection error:`)
    );

    db.once("open", function () {
        debug(`MongoDB status: Connected ${chalk.green("✓")}`);
        if (process.env.MOCK === 'init') {
            setInitialData();
        }
    });

};
