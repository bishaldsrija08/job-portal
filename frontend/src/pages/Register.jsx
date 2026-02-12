import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { registerUser, status } from "../store/authSlice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
        console.log(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(formData))
        console.log("Form Data Submitted: ", formData)
        alert("Registration functionality is under development.")
    }
    const authState = useSelector((state) => state.auth)
    // navigate to login page on successful registration
    if (authState.status === status.IDLE && authState.error === null) {
        navigate("/login")
    }

    return (
        <>
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 flex flex-col mx-auto mt-20">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
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
                    <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>

        </>
    )
}

export default Register
