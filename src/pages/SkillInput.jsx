import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SkillInput() {
  const navigate = useNavigate();
  const location = useLocation();

  const { userType, careerGoal } = location.state || {};

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const addSkill = () => {
    if (skillInput.trim() !== "" && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="page-container">
      <div className="glass-card">

        <h2 className="hero-title" style={{ fontSize: "34px" }}>
          Your Current Skills
        </h2>

        <p className="subtitle">
          Tell us what you already know. AI will analyze your strengths.
        </p>

        {/* Input */}
        <div className="skill-input-wrapper">
          <input
            type="text"
            placeholder="Type a skill (e.g. Python)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            className="ai-input"
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
          />
          <button className="add-btn" onClick={addSkill}>
            Add
          </button>
        </div>

        {/* Skill Chips */}
        <div className="skill-chips">
          {skills.map((skill) => (
            <div key={skill} className="chip">
              {skill}
              <span onClick={() => removeSkill(skill)}>✕</span>
            </div>
          ))}
        </div>

        <button
          className="primary-btn"
          disabled={skills.length === 0}
          onClick={() =>
            navigate("/summary", {
              state: { userType, careerGoal, skills },
            })
          }
        >
          Analyze →
        </button>

      </div>
    </div>
  );
}

export default SkillInput;