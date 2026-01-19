import {BrowserRouter, Route, Routes} from "react-router-dom"
import About from "./About"
import Nabvar from "./Nabvar"
function App() {
  return (
    <>
    <Nabvar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App