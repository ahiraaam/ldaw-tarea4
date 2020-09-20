const router = require("express").Router();
const homepageController = require("../controllers/HomepageController");
const tasksController = require("../controllers/TasksController");

router.get("/", homepageController.index);

router.post("/tasks", tasksController.store);

router.post("/changeStatus/:id", tasksController.changeStatus);

router.post("/changeStatus", tasksController.changeStatusAjax);

router.post("/deleteTask", tasksController.deleteTask);

module.exports = router;
