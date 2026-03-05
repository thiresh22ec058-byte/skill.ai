import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserType from "./pages/UserType";
import CareerGoal from "./pages/CareerGoal";
import SkillInput from "./pages/SkillInput";
import Summary from "./pages/Summary";
import Roadmap from "./pages/Roadmap";
import Progress from "./pages/Progress";
import JobReady from "./pages/JobReady";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usertype" element={<UserType />} />
        <Route path="/careergoal" element={<CareerGoal />} />
         <Route path="/skills" element={<SkillInput />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/jobready" element={<JobReady />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </Router>
  );
}

export default App;