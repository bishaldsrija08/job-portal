const Job = require("./JobModel");
const User = require("./UserModel");

// Relationships between User and Job
User.hasMany(Job, { foreignKey: 'userId'});
Job.belongsTo(User, { foreignKey: 'userId'});


module.exports = {User, Job}