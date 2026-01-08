const { createJob, getAlljobs, getJobById, deleteJobById, updateJobById } = require('../controller/jobController');
const isAuthenticate = require('../middlewares/isAuthenticate');
const restrictedTo = require('../middlewares/restrictedTo');

const router = require('express').Router();

router.route("/job").post(isAuthenticate, restrictedTo('jobProvider'), createJob).get(getAlljobs)
router.route("/job/:id").get(getJobById).delete(isAuthenticate, deleteJobById).patch(isAuthenticate, updateJobById)

module.exports = router;