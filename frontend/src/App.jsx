import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nabvar from "./Nabvar"
import Register from "./pages/Register"
function App() {
  return (
    <>
      <Nabvar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App