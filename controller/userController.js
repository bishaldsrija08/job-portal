const User = require("../model/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateOtp = require("../services/generateOtp");
const { default: sendEmail } = require("../services/sendEmail");

// Create a new user -> register user
const registerUser = async (req, res) => {
    // taking data from req body
    const { username, userEmail, userPassword } = req.body
    if (!username || !userEmail || !userPassword) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    // Check if user already exists
    const isExistingUser = await User.findOne({ where: { userEmail } }) // returns object or null

    if (isExistingUser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    // Create user
    await User.create({
        username,
        userEmail,
        userPassword: bcrypt.hashSync(userPassword, 10) // hashing password
    })
    return res.status(201).json({
        message: "User registered successfully"
    })
}

// Login User

const loginUser = async (req, res) => {
    const { userEmail, userPassword } = req.body
    if (!userEmail || !userPassword) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    // Check if user exists
    const isExistingUser = await User.findOne({ where: { userEmail } }) // returns object or null

    if (!isExistingUser) {
        return res.status(400).json({
            message: "User does not exist"
        })
    }

    // Check password
    const isPasswordValid = bcrypt.compareSync(userPassword, isExistingUser.userPassword)
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    // Generate JWT Token
    const token = jwt.sign({ id: isExistingUser.id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    return res.status(200).json({
        message: "User logged in successfully",
        data: token
    })
}

// Forgot password

const forgotPassword = async (req, res) => {
    const { userEmail } = req.body;

    if (!userEmail) {
        return res.status(400).json({
            message: "Email is required"
        })
    }

    // Check if user exists
    const isExistingUser = await User.findOne({
        where: { userEmail }
    })
    if (!isExistingUser) {
        return res.status(400).json({
            message: "User does not exist"
        })
    }

    // generate otp
    const otp = generateOtp();

    const sendEmailData = {
        to: userEmail,
        subject: "Password Reset OTP",
        text: `Your OTP for password reset is ${otp}. It is valid for 2 minutes.`
    }
    console.log("Error")
    // Send mail
    await sendEmail(sendEmailData)

    // Save otp to db
    isExistingUser.otp = otp;
    isExistingUser.otpGeneratedTime = Date.now().toString();
    await isExistingUser.save();

    return res.status(200).json({
        message: "OTP sent to your email"
    })
}

const checkOtp = async (req, res) => {
    const { userEmail, otp } = req.body;

    if (!userEmail || !otp) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    // Check if user exists
    const isExistingUser = await User.findOne({
        where: { userEmail, otp }
    })

    if (!isExistingUser || isExistingUser.otp !== otp) {
        return res.status(400).json({
            message: "No user found or invalid OTP"
        })
    }

    // Check if otp is expired
    const currentTime = Date.now();
    const otpGeneratedTime = parseInt(isExistingUser.otpGeneratedTime);
    const diff = (currentTime - otpGeneratedTime) / 1000 // in seconds
    if (diff > 120) {
        isExistingUser.otp = null;
        isExistingUser.otpGeneratedTime = null;
        await isExistingUser.save();
        return res.status(400).json({
            message: "OTP expired"
        })
    }

    // Otp is valid
    isExistingUser.otp = null;
    isExistingUser.otpGeneratedTime = null;
    await isExistingUser.save();

    return res.status(200).json({
        message: "OTP verified successfully"
    })
}

// password reset

const resetPassword = async (req, res) => {
    const { userEmail, newPassword, confirmPassword } = req.body;
    console.log(req.body)
    if (!userEmail || !newPassword || !confirmPassword) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    //check if passwords match
    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match"
        })
    }

    // Check if user exists
    const isExistingUser = await User.findOne({
        where: {userEmail}
    })

    if(!isExistingUser){
        return res.status(400).json({
            message: "User does not exist"
        })
    }

    // Update password
    isExistingUser.userPassword = bcrypt.hashSync(newPassword, 10)

    await isExistingUser.save();

    return res.status(200).json({
        message: "Password reset successfully"
    })
}

// exporting all controller functions
module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    checkOtp,
    resetPassword
}