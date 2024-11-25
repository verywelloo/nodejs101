const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getSingleTask,
  deleteTask,
  createTask,
  updateTask,
} = require("../controller/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingleTask).delete(deleteTask).patch(updateTask);

module.exports = router;
