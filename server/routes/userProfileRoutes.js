const { getUerProfile, getAllUserProfiles, updateProfileById, deleteProfileById } = require('../controller/userProfileController');
const isAuthenticate = require('../middlewares/isAuthenticate');
const restrictedTo = require('../middlewares/restrictedTo');

const router = require('express').Router();

const { multer, storage } = require("../middlewares/multerConfig");
const uploads = multer({ storage: storage })



router.route("/users").get(isAuthenticate, restrictedTo("jobProvider"), getAllUserProfiles)
router.route("/users/:id").get(isAuthenticate, restrictedTo("jobSeeker", "jobProvider"), getUerProfile).patch(isAuthenticate, restrictedTo("jobSeeker"), uploads.single("userProfilePic"), updateProfileById).delete(isAuthenticate, restrictedTo("jobSeeker"), deleteProfileById)


module.exports = router;