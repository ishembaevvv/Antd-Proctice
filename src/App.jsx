import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Log from "./pages/Log";
import Lists from "./pages/Lists";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Log />} />
        <Route path="/list" element={<Lists />} />
      </Routes>
    </Router>
  )
}

export default App
