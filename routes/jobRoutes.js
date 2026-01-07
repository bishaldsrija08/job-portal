const { createJob, getAlljobs, getJobById, deleteJobById, updateJobById } = require('../controller/jobController');


const router = require('express').Router();

// router.route("/job").post(createJob)
// router.post("/job", createJob)
// router.get("/jobs", getAlljobs)'
// router.get("/job/:id", getJobById)
// router.delete("/job/:id", deleteJobById)

router.route("/job").post(createJob).get(getAlljobs)
router.route("/job/:id").get(getJobById).delete(deleteJobById).patch(updateJobById)

module.exports = router;