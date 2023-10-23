const express = require("express");
const router = express.Router();
const albunsRoute = require("./task.route");

router.use(
    "/task",
    albunsRoute
    // #swagger.name = 'task-controller'
    // #swagger.description = 'Tasks Controller.'
    // #swagger.tags = ['Tasks']
);

module.exports = router;
