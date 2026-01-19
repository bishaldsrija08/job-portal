const { User } = require("../model")
const bcrypt = require('bcrypt');
const fs = require('fs');

// Get all profiles

const getAllUserProfiles = async (req, res) => {
    const users = await User.findAll(
        {
            where: {
                userRole: "jobSeeker"
            },
            attributes: { exclude: ["userPassword"] }
        }
    )

    if (users.length === 0) {
        return res.status(400).json({
            message: "No user profiles found"
        })
    }
    return res.status(200).json({
        message: "User profiles fetched successfully",
        data: users
    })
}


// Get User Profile
const getUerProfile = async (req, res) => {
    const userId = req.user.id
    const { id } = req.params

    if (userId != id) {
        return res.status(403).json({
            message: "Access denied"
        })
    }

    const user = await User.findByPk(userId, {
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })

    if (!user) {
        return res.status(400).json({
            message: "User not found"
        })
    }

    return res.status(200).json({
        message: "User profile fetched successfully",
        data: user
    })
}


// Update User Profile
const updateProfileById = async (req, res) => {

    const userId = req.user.id
    const { id } = req.params

    const { username, userEmail, userPassword } = req.body
    if (!username || !userEmail || !userPassword) {
        return res.status(400).json({
            message: "Username, Email, and Password are required"
        })
    }

    if (userId != id) {
        return res.status(403).json({
            message: "Access denied"
        })
    }

    const user = await User.findByPk(userId, {
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })

    if (!user) {
        return res.status(400).json({
            message: "User not found"
        })
    }
    // update file
    let fileName;
    if (req.file) {
        // http://localhost:4000/uploads/1768109807386_Digital Bishal - Learn Basic Node.js with  EJS.png
        const oldFilePath = user.userProfilePic
        const pathToDelete = "http://localhost:4000/uploads/"
        const oldFileName = oldFilePath.split(pathToDelete)[1]

        fs.unlink(`./uploads/${oldFileName}`, (err) => {
            if (err) {
                console.log("Error deleting file:", err);
            } else {
                console.log("Old profile picture deleted successfully");
            }
        })
        fileName = req.file.filename
    } else {
        fileName = user.userProfilePic
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(userPassword, 10)

    await User.update({
        username,
        userEmail,
        userPassword: hashedPassword,
        userProfilePic: req.file ? "http://localhost:4000/uploads/" + fileName : user.userProfilePic
    }, {
        where: { id: userId }
    })


    res.status(200).json({
        message: "User profile updated successfully"
    })





}

// Delete User Profile

const deleteProfileById = async (req, res) => {
    const userId = req.user.id
    const { id } = req.params

    if (userId != id) {
        return res.status(400).json({
            message: "Access denied"
        })
    }

    const user = await User.findByPk(userId)

    if (!user) {
        return res.status(400).json({
            message: "User not found"
        })
    }

    const oldFilePath = user.userProfilePic 
    const oldFileName = oldFilePath.split("http://localhost:4000/uploads/")[1]

    fs.unlink(`./uploads/${oldFileName}`, (err) => {
        if (err) {
            console.log("Error deleting file:", err);
        } else {
            console.log("Old profile picture deleted successfully");
        }
    })

    await User.destroy({
        where: { id: userId }
    })

    res.status(200).json({
        message: "User profile deleted successfully"
    })
}






module.exports = {
    getUerProfile,
    getAllUserProfiles,
    updateProfileById,
    deleteProfileById
}