const { createJob, getAlljobs, getJobById, deleteJobById, updateJobById } = require('../controller/jobController');
const { checkOtp } = require('../controller/userController');
const isAuthenticate = require('../middlewares/isAuthenticate');
const restrictedTo = require('../middlewares/restrictedTo');
const errorHandler = require('../services/catchAsyncError');

const router = require('express').Router();

router.route("/job").post(isAuthenticate, restrictedTo('jobProvider'), errorHandler(createJob)).get(errorHandler(getAlljobs))
router.route("/job/:id").get(errorHandler(getJobById)).delete(isAuthenticate, errorHandler(deleteJobById)).patch(isAuthenticate, errorHandler(updateJobById))

router.route("/check-otp").post(errorHandler(checkOtp))

module.exports = router;