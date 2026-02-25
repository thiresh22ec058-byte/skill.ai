import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SkillInput from "./pages/SkillInput";
import Summary from "./pages/Summary";
import Roadmap from "./pages/Roadmap";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import JobReady from "./pages/JobReady";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/skillinput" element={<SkillInput />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/jobready" element={<JobReady />} />
      </Routes>
    </Router>
  );
}

export default App;