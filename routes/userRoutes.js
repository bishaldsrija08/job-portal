const { registerUser, loginUser, forgotPassword, checkOtp, resetPassword } = require('../controller/userController');
const errorHandler = require('../services/catchAsyncError');


const router = require('express').Router();

router.route("/register").post(errorHandler(registerUser))
router.route("/login").post(errorHandler(loginUser))
router.route("/forgot-password").post(errorHandler(forgotPassword))
router.route("/change-password").post(errorHandler(resetPassword))




module.exports = router;