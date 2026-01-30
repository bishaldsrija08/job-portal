import { useState } from "react"

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        userEmail: "",
        userPassword: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        // console.log(name, value)
        setFormData({
            ...formData,
            [name]: value
        })
    }
    console.log(formData.userEmail)
    return (
        <>
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>
                <form className="space-y-5">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input onChange={handleChange} name="username" type="text" placeholder="Your username" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input onChange={handleChange} name="userEmail" type="email" placeholder="you@example.com" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input onChange={handleChange} name="userPassword" type="password" placeholder="••••••••" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?
                    <a href="#" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>

        </>
    )
}

export default Register
