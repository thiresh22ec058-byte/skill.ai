import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import UserType from "./pages/UserType";
import CareerGoal from "./pages/CareerGoal";
import SkillInput from "./pages/SkillInput";
import Summary from "./pages/Summary";
import Roadmap from "./pages/Roadmap";
import Progress from "./pages/Progress";
import JobReady from "./pages/JobReady";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/usertype" element={<UserType />} />
        <Route path="/careergoal" element={<CareerGoal />} />
        <Route path="/skills" element={<SkillInput />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/jobready" element={<JobReady />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;