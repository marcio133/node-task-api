class TaskNotFoundException extends Error {
    constructor() {
        super("Task not found.");
        this.statusCode = 404;
    }
}

module.exports = {
    TaskNotFoundException,
};
