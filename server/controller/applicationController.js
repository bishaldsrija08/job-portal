const { Job, Application, User } = require("../model")

// Apply for a job
// only jobSeeker can access
const applyForJob = async (req, res) => {
    const userId = req.user.id
    const { jobId } = req.params

    // check if job exists
    const job = await Job.findByPk(jobId)
    if (!job) {
        return res.status(400).json({
            message: "Job not found"
        })
    }

    // Check if user has already applied for the job
    const existingJobApplication = await Application.findOne({
        where: {
            userId,
            jobId
        }
    })

    if (existingJobApplication) {
        return res.status(400).json({
            message: "You have already applied for this job"
        })
    }

    // Create a new job application
    const application = await Application.create({
        userId,
        jobId
    })
    return res.status(200).json({
        message: "Job application submitted successfully",
        data: application
    })
}

// Get all applications for a job
// only jobProvider can access

const getApplicationsForJob = async (req, res) => {
    const { jobId } = req.params
    const applications = await Application.findAll({
        where: { jobId },
        include: [{
            model: User,
            attributes: ["id", "username"]
        },
        {
            model: Job,
            attributes: ["id", "jobTitle"]
        }]
    })

    if (applications.length === 0) {
        return res.status(400).json({
            message: "No applications found for this job"
        })
    }
    return res.status(200).json({
        message: "Applications fetched successfully",
        data: applications
    })
}

// Get single application by id
// can get by jobSeeker and jobProvider

const getMyApplication = async (req, res) => {
    const { id } = req.params
    const application = await Application.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ["username", "userEmail"]
            }, {
                model: Job,
                attributes: ["jobTitle", "jobDescription", "jobLocation", "jobSalary", "jobCompany"]
            }
        ]
    })
    if (!application) {
        res.status(400).json({
            message: "Application not found"
        })
    }
    res.status(200).json({
        message: "Application fetched successfully",
        data: application
    })
}

// update application status

const updateApplicationStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
        return res.status(400).json({
            message: "Please provide status to update"
        })
    }

    const application = await Application.findByPk(id)

    if (!application) {
        return res.status(400).json({
            message: "Application not found"
        })
    }

    application.status = status
    await application.save()

    res.status(200).json({
        message: "Application status updated successfully",
        data: application
    })
}

// Delete application by id

const deleteApplicationById = async (req, res)=>{
    const {id} = req.params

    const application = await Application.findByPk(id)

    if(!application){
        return res.status(400).json({
            message: "Application not found"
        })
    }
    await Application.destroy({
        where: {id}
    })
    res.status(200).json({
        message: "Application deleted successfully"
    })
}

module.exports = { applyForJob, getApplicationsForJob, getMyApplication, updateApplicationStatus, deleteApplicationById }