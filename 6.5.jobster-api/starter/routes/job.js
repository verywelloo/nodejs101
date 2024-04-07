const express = require("express");
const router = express.Router();
const testUser = require("../middleware/testUser");

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} = require("../controller/job");

router.route("/").get(getAllJobs).post(testUser, createJob);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(getJob)
  .patch(testUser, updateJob)
  .delete(testUser, deleteJob);

module.exports = router;
