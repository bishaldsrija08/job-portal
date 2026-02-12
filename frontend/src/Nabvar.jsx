import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "./store/authSlice"

const Nabvar = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleLogOut = () => {
    dispatch(logoutUser)
  }

  return (
    <>
      <nav className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 cursor-pointer">
            JobPortal
          </Link>

          {/* Right Buttons */}
          <div className="flex gap-4">
            {isAuthenticated ? (
              <button onClick={handleLogOut} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Logout
              </button> ) : (<div className="flex gap-4"><Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
              Login
            </Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded">
                Register
              </Link>
            </div>
            )}
          </div>

        </div>
      </nav>

    </>
  )
}

export default Nabvar
