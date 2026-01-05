const { createJob, getAllJobs } = require('../controller/jobController');


const router = require('express').Router();

// router.route("/job").post(createJob)
router.post("/job", createJob)
router.get("/jobs", getAllJobs)

module.exports = router;