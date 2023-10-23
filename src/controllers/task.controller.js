const taskService = require("../services/task.service");

async function listAll(req, res) {
    try {
        const listaDeAlbuns = await taskService.listAll();
        res.send(listaDeAlbuns);
    } catch (error) {
        res.json(error);
    }
}

async function getById(req, res, next) {
    try {
        const id = req.params.id;
        const task = await taskService.getById(id);
        res.send(task);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const newTask = await taskService.create(req.body);
        res.json(newTask);
    } catch (error) {
        next(error);
    }
}

async function updateStatus(req, res, next) {
    try {
        const id = req.params.id;
        const updated = await taskService.updateStatus(id, req.body);
        res.send(updated);
    } catch (error) {
        next(error);
    }
}

async function updateTask(req, res, next) {
    try {
        const id = req.params.id;
        const updated = await taskService.updateTask(id, req.body);
        res.send(updated);
    } catch (error) {
        next(error);
    }
}

async function deleteTask(req, res, next) {
    try {
        const id = req.params.id;
        const deletedTask = await taskService.deleteTask(id);
        res.send(deletedTask);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listAll,
    getById,
    create,
    updateStatus,
    updateTask,
    deleteTask
};
