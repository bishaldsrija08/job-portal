import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nabvar from "./Nabvar"
import Register from "./pages/Register"
import Login from "./pages/Login"
import JobProviderDashboard from "./pages/JobProviderDashboard"
import CreateJob from "./pages/CreateJob"
function App() {
  return (
    <>
      <BrowserRouter>
      <Nabvar />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/provider-dashboard" element={<JobProviderDashboard />} />
          <Route path="/create-job" element={<CreateJob />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App