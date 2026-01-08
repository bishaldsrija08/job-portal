const { applyForJob, getApplicationsForJob, getJobApplicationById, updateApplicationStatus, deleteApplicationById } = require('../controller/applicationController');
const isAuthenticate = require('../middlewares/isAuthenticate');
const restrictedTo = require('../middlewares/restrictedTo');

const router = require('express').Router();

router.route("/apply/:jobId").post(isAuthenticate, restrictedTo("jobSeeker"), applyForJob)
router.route("/applications/:jobId").get(isAuthenticate, restrictedTo("jobProvider"), getApplicationsForJob)
router.route("/application/:id").get(isAuthenticate, restrictedTo("jobSeeker", "jobProvider"), getJobApplicationById).patch(isAuthenticate, restrictedTo("jobProvider"), updateApplicationStatus).delete(isAuthenticate, restrictedTo("jobProvider"), deleteApplicationById)

module.exports = router;