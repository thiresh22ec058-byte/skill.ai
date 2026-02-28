import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function SkillInput() {
  const navigate = useNavigate();
  const location = useLocation();

  const { careerGoal } = location.state || {};

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= REDIRECT IF NO GOAL ================= */
  useEffect(() => {
    if (!careerGoal) {
      navigate("/");
    }
  }, [careerGoal, navigate]);

  /* ================= ADD SKILL ================= */
  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  /* ================= REMOVE SKILL ================= */
  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  /* ================= HANDLE ANALYZE ================= */
  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        navigate("/login");
        return;
      }

      // 1️⃣ Save skills
      await axios.put(
        "http://localhost:5000/api/users/skills",
        { skills },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 2️⃣ Decode token to get userId
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      // 3️⃣ Analyze
      const analyzeResponse = await axios.post(
        "http://localhost:5000/api/analyze",
        {
          goal: careerGoal,
          userId
        }
      );

      navigate("/summary", {
        state: {
          analysis: analyzeResponse.data
        }
      });

    } catch (error) {
      console.error("Analyze Error:", error);
      alert("Failed to analyze skills");
    } finally {
      setLoading(false);
    }
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

        {/* Skill Input */}
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
              <span onClick={() => removeSkill(skill)}> ✕ </span>
            </div>
          ))}
        </div>

        {/* Analyze Button */}
        <button
          className="primary-btn"
          disabled={skills.length === 0 || loading}
          onClick={handleAnalyze}
        >
          {loading ? "Analyzing..." : "Analyze →"}
        </button>
      </div>
    </div>
  );
}

export default SkillInput;