const { Job, User } = require("../model")



const createJob = async (req, res) => {
    const { jobTitle, jobDescription, jobLocation, jobSalary, jobCompany } = req.body
    const userId = "146d08a3-0b4d-4aac-b1f4-a7827bbd4f61"
    if (!jobTitle || !jobDescription || !jobLocation || !jobSalary || !jobCompany) {
        return res.status(400).json({ message: "All fields are required" })
    }
    await Job.create({
        jobTitle,
        jobDescription,
        jobLocation,
        jobSalary,
        jobCompany,
        userId
    })
    res.status(201).json({
        message: "job created successfully",
    })
}
// get all jobs
const getAlljobs = async (req, res) => {
    const jobs = await Job.findAll({
        include: {
            model: User,
            attributes: ["id", "username", "userEmail"]
        }
    }); // returns array 
    if (jobs.length == 0) {
        return res.status(404).json({
            message: "No jobs found"
        })
    }
    res.status(200).json({
        message: "Jobs fetched successfully",
        data: jobs
    })
}

// get single job by id
const getJobById = async (req, res) => {
    // get id from req.params
    const id = req.params.id
    if (!id) {
        return res.status(400).json({
            message: "Job id is required"
        })
    }

    // fetch job from db
    const job = await Job.findByPk(id, {
        include: {
            model: User,
            attributes: ["id", "username", "userEmail"]
        }
    }) // returns single object/null
    if (!job) {
        return res.status(400).json({
            message: "Job not found"
        })
    }
    return res.status(200).json({
        message: "Job fetched successfully",
        data: job
    })
}


// update job by id
const updateJobById = async (req, res) => {
    const id = req.params.id;
    const { jobTitle, jobDescription, jobLocation, jobSalary, jobCompany } = req.body

    // check req.body

    if (!jobTitle || !jobDescription || !jobLocation || !jobSalary || !jobCompany) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    // Check if job exists
    const job = await Job.findOne({ where: { id } }) // returns single object/null

    if (!job) {
        return res.status(400).json({
            message: "Job not found"
        })
    }

    // Update job

    await Job.update({
        jobTitle,
        jobDescription,
        jobLocation,
        jobSalary,
        jobCompany
    }, { where: { id } }
    )
    const jobs = await Job.findByPk(id, {
        include: {
            model: User,
            attributes: ["id", "username", "userEmail"]
        }
    })
    return res.status(200).json({
        message: "Job updated successfully",
        data: jobs
    })
}


// delete job by id
const deleteJobById = async (req, res) => {
    const id = req.params.id

    // Check if job exists
    const job = await Job.findOne({ where: { id } })
    if (!job) {
        return res.status(400).json({
            message: "Job not found"
        })
    }

    // Delete job
    await Job.destroy({ where: { id } })
    return res.status(200).json({
        message: "Job deleted successfully"
    })
}



module.exports = {
    createJob,
    getAlljobs,
    getJobById,
    deleteJobById,
    updateJobById
}