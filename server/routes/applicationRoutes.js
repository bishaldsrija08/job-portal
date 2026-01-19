const { applyForJob, getApplicationsForJob, updateApplicationStatus, deleteApplicationById, getMyApplication } = require('../controller/applicationController');
const isAuthenticate = require('../middlewares/isAuthenticate');
const restrictedTo = require('../middlewares/restrictedTo');
const errorHandler = require('../services/catchAsyncError');

const router = require('express').Router();

router.route("/apply/:jobId").post(isAuthenticate, restrictedTo("jobSeeker"), errorHandler(applyForJob))
router.route("/applications/:jobId").get(isAuthenticate, restrictedTo("jobProvider"), errorHandler(getApplicationsForJob))
router.route("/application/:id").get(isAuthenticate, restrictedTo("jobSeeker", "jobProvider"), errorHandler(getMyApplication)).patch(isAuthenticate, restrictedTo("jobProvider"), errorHandler(updateApplicationStatus)).delete(isAuthenticate, restrictedTo("jobProvider"), errorHandler(deleteApplicationById))

module.exports = router;