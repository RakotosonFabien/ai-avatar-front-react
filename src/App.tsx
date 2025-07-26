import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import LiveTest from "./pages/LiveTest"

function App() {
    return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/live" element={<LiveTest />} />
    </Routes>
  )
}

export default App
