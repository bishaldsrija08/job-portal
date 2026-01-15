const { User } = require("./model")
const bcrypt = require('bcrypt');




const seedAdminUser = async () => {

    const userAdmin = await User.findOne({
        where: { userEmail: process.env.ADMIN_EMAIL }
    })

    // If admin user already exists, do not create again
    if (userAdmin) {
        console.log("Admin user already exists!");
        return;
    }

    // Create admin user
    await User.create({
        username: "bishalrijal",
        userEmail: process.env.ADMIN_EMAIL,
        userPassword: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
        userRole: "jobProvider"
    })
    console.log("Admin user created successfully!");
}

module.exports = seedAdminUser;