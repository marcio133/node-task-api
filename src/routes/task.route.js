const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/task.controller");
const tasksValidators = require("../middlewares/validators/task.validator")

router.get("/", tasksController.listAll);
router.post("/", tasksValidators.createTaskValidator, tasksController.create,
    /*  #swagger.parameters['task'] = {      
        in: 'body',
        type: 'object',
        required: true,
        '@schema': {
          properties: {
            title: {
              type: "string",          
            },
            description: {
              type: "string"
            },
            priority: {
              type: "integer",          
            },
          },
          required: ["title", "description", "priority",]
        },
    } */
);
router.get("/:id", tasksController.getById);
router.put("/:id/updateStatus", tasksController.updateStatus,
    /*  #swagger.parameters['task'] = {      
        in: 'body',
        type: 'object',
        required: true,
        '@schema': {
          properties: {
            isConcluded: {
              type: "boolean",          
            },
          },
          required: ["isConcluded"]
        },
    } */
);
router.put("/:id/", tasksController.updateTask,
    /*  #swagger.parameters['task'] = {      
        in: 'body',
        type: 'object',
        required: true,
        '@schema': {
          properties: {
            title: {
              type: "string",          
            },
            description: {
              type: "string"
            },
            priority: {
              type: "integer",          
            },
          },
          required: []
        },
    } */
);
router.delete("/:id/", tasksController.deleteTask);


module.exports = router;
