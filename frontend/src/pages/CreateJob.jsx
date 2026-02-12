import axios from 'axios';
import { useState } from 'react'
import { APIAuthenticatedClient } from '../api';

const CreateJob = () => {
    const [formData, setFormData] = useState({
        jobTitle: "",
        jobDescription: "",
        jobLocation: "",
        jobSalary: "",
        jobCompany: ""
    })

    // Handle form input changes
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value
        })
        console.log(name, value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send formData to your backend API
        const response = APIAuthenticatedClient.post('/job', formData)
        if (response.status === 201) {
            alert("Job created successfully!")
        } else {
            alert("Failed to create job. Please try again.")
        }
    }
    return (
        <>
            {/* Create Job Form */}
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Create Job</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <input
                        name="jobTitle"
                        placeholder="Job Title"
                        className="w-full border p-2 rounded"
                        value={formData.jobTitle}
                        onChange={handleChange}
                    />

                    <textarea
                        name="jobDescription"
                        placeholder="Job Description"
                        className="w-full border p-2 rounded"
                        value={formData.jobDescription}
                        onChange={handleChange}
                    />

                    <input
                        name="jobLocation"
                        placeholder="Location"
                        className="w-full border p-2 rounded"
                        value={formData.jobLocation}
                        onChange={handleChange}
                    />

                    <input
                        name="jobSalary"
                        placeholder="Salary"
                        className="w-full border p-2 rounded"
                        value={formData.jobSalary}
                        onChange={handleChange}
                    />

                    <input
                        name="jobCompany"
                        placeholder="Company"
                        className="w-full border p-2 rounded"
                        value={formData.jobCompany}
                        onChange={handleChange}
                    />

                    <button className="w-full bg-blue-600 text-white py-2 rounded">
                        Create Job
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreateJob
