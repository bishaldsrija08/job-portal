import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nabvar from "./Nabvar"
import Register from "./pages/Register"
import Login from "./pages/Login"
function App() {
  return (
    <>
      <Nabvar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App