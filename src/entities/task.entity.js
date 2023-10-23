const sequelize = require("sequelize");
const database = require("../db");

class Task extends sequelize.Model { }

Task.init(
    {
        idTask: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize.STRING,
            allowNull: false,
        },
        isConcluded: {
            type: sequelize.BOOLEAN,
            allowNull: false,
        },
        priority: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        modelName: "Task",
        tableName: "Tasks",
    }
);

module.exports = Task;
