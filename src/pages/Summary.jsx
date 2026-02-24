import { useLocation, useNavigate } from "react-router-dom";

function Summary() {
  const location = useLocation();
  const navigate = useNavigate();

  const { userType, careerGoal, skills } = location.state || {};

  // Simulated AI Skill Requirements
  const roleSkillMap = {
    "Software Developer": ["Data Structures", "Git & GitHub", "SQL", "Projects"],
    "Data Analyst": ["SQL", "Python", "Excel", "Statistics"],
    "AI Engineer": ["Python", "Machine Learning", "Deep Learning", "Math"],
    "Cyber Security Specialist": ["Networking", "Linux", "Security Tools", "Ethical Hacking"],
    "Full Stack Developer": ["Frontend", "Backend", "Database", "Projects"],
    "Core Engineer": ["Core Concepts", "Technical Projects", "Problem Solving"]
  };

  const requiredSkills = roleSkillMap[careerGoal] || [];

  const skillsYouHave = skills || [];

  const skillsMissing = requiredSkills.filter(
    (skill) => !skillsYouHave.includes(skill)
  );

  const skillsToImprove = skillsYouHave.filter(
    (skill) => requiredSkills.includes(skill)
  );

  return (
    <div className="page-container">
      <div className="glass-card">

        <h2 className="hero-title" style={{ fontSize: "32px" }}>
          AI Skill Analysis
        </h2>

        <p className="subtitle">
          Based on your goal: <strong>{careerGoal}</strong>
        </p>

        {/* Skills You Have */}
        <div className="analysis-box">
          <h4>✅ Skills You Have</h4>
          {skillsYouHave.length === 0 ? (
            <p>No skills added.</p>
          ) : (
            skillsYouHave.map((skill) => (
              <p key={skill}>• {skill}</p>
            ))
          )}
        </div>

        {/* Skills To Improve */}
        <div className="analysis-box">
          <h4>⚠ Skills To Improve</h4>
          {skillsToImprove.length === 0 ? (
            <p>None matched yet.</p>
          ) : (
            skillsToImprove.map((skill) => (
              <p key={skill}>• {skill}</p>
            ))
          )}
        </div>

        {/* Skills Missing */}
        <div className="analysis-box">
          <h4>❌ Skills Missing</h4>
          {skillsMissing.length === 0 ? (
            <p>You are well aligned!</p>
          ) : (
            skillsMissing.map((skill) => (
              <p key={skill}>• {skill}</p>
            ))
          )}
        </div>

        <button
          className="primary-btn"
          onClick={() =>
            navigate("/roadmap", {
              state: { userType, careerGoal, skillsYouHave, skillsMissing }
            })
          }
        >
          Start Learning →
        </button>

      </div>
    </div>
  );
}

export default Summary;