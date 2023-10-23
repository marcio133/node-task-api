const Task = require("../entities/task.entity");
const { TaskNotFoundException } = require("../exceptions/task.exception");

async function listAll() {
    const tasks = await Task.findAll()

    return tasks.map(task => task.get());
}

async function create(task = { title, description, priority }) {
    return Task.create({ ...task, isConcluded: false });
}

async function getById(id) {
    const task = await Task.findByPk(id);

    if (!task)
        throw new TaskNotFoundException();

    return task;
}

async function updateStatus(id, { isConcluded }) {
    const task = await Task.findByPk(id);
    if (!task) throw new TaskNotFoundException();

    return Task.update({ isConcluded }, { where: { idTask: id }, returning: true, plain: true })
        .then(([_, result]) => {
            return result;
        });
}

async function updateTask(id, data = { task }) {
    const task = await Task.findByPk(id);
    if (!task) throw new TaskNotFoundException();

    return Task.update(data, { where: { idTask: id }, returning: true, plain: true })
        .then(([_, result]) => {
            console.log(result)
            return result;
        });
}

async function deleteTask(id) {
    const task = await Task.findByPk(id);
    if (!task) throw new TaskNotFoundException();

    return Task.destroy({ where: { idTask: id } })
        .then(() => task);
}

module.exports = {
    listAll,
    create,
    getById,
    updateStatus,
    updateTask,
    deleteTask,
};
