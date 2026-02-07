import React from 'react'

const CreateJob = () => {
    return (
        <>
            {/* Create Job Form */}
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Create Job</h2>

                <form className="space-y-4">

                    <input
                        name="jobTitle"
                        placeholder="Job Title"
                        className="w-full border p-2 rounded"
                    />

                    <textarea
                        name="jobDescription"
                        placeholder="Job Description"
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="jobLocation"
                        placeholder="Location"
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="jobSalary"
                        placeholder="Salary"
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="jobCompany"
                        placeholder="Company"
                        className="w-full border p-2 rounded"
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
