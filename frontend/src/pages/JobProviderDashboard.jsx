import { useNavigate } from "react-router-dom"

const JobProviderDashboard = () => {
    const navigate = useNavigate();
    const handleCreate = () => {
        navigate("/create-job");
    }
    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Job Provider Dashboard</h1>
                    <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
                        Create Job +
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-gray-500">Total Jobs</p>
                        <h2 className="text-2xl font-bold">12</h2>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-gray-500">Active Jobs</p>
                        <h2 className="text-2xl font-bold">10</h2>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-gray-500">Companies</p>
                        <h2 className="text-2xl font-bold">5</h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Job List */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Your Jobs</h2>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto">

                            {/* Job Card */}
                            <div className="border p-4 rounded-lg flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">Frontend Developer</h3>
                                    <p className="text-sm text-gray-600">ABC Company</p>
                                    <p className="text-sm">Kathmandu</p>
                                    <p className="text-sm font-semibold">Rs. 50000</p>
                                </div>

                                <div className="flex gap-2">
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Repeat job cards as needed */}

                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}

export default JobProviderDashboard
