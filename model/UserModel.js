const {DataTypes}= require('sequelize');
const { sequelize } = require('../database/dbConfig');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    userPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userRole:{
        type: DataTypes.ENUM("jobSeeker", "jobProvider"),
        allowNull: false,
        defaultValue: "jobSeeker"
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otpGeneratedTime:{
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = User;