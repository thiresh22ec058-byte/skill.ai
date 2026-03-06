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

    const storedGoal = localStorage.getItem("careerGoal");

    if (!storedGoal) {
      navigate("/careergoal");
    }

  }

}, [careerGoal, navigate]);

  /* ================= ADD SKILL ================= */
  const addSkill = () => {

    const trimmed = skillInput.trim();

    if (!trimmed) return;

    if (!skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }

    setSkillInput("");

  };

  /* ================= REMOVE SKILL ================= */
  const removeSkill = (skillToRemove) => {

    setSkills((prev) =>
      prev.filter((skill) => skill !== skillToRemove)
    );

  };

  /* ================= HANDLE ANALYZE ================= */
  const handleAnalyze = async () => {

    if (skills.length === 0) return;

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      /* Save user skills */
      try {

        await axios.put(
          "http://localhost:5000/api/users/skills",
          { skills },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      } catch (saveError) {

        console.warn(
          "Skill save failed but continuing:",
          saveError.response?.data || saveError.message
        );

      }

      /* Call AI analyze API */
      const analyzeResponse = await axios.post(
        "http://localhost:5000/api/ai/analyze-career",
        {
          resumeText: skills.join(" "),
          goal: careerGoal
        }
      );

      const analysis = analyzeResponse.data;

      /*
        Save EVERYTHING needed for later pages
      */

      localStorage.setItem("careerGoal", careerGoal);
        localStorage.setItem(
        "analysis",
        JSON.stringify({
          skillsYouHave: skills, // EXACT USER INPUT
          missingSkills: analysis.missingSkills || [],
          readinessScore: analysis.readinessScore || 0,
          goal: careerGoal
        })
      );

      /* Go to summary */
     navigate("/summary", {
  state: {
    goal: careerGoal,
    skillsYouHave: skills,
    missingSkills: analysis.missingSkills || [],
    readiness: analysis.readinessScore || 0
  }
});
    } catch (error) {

      console.error(
        "Analyze Error:",
        error.response?.data || error.message
      );

      alert("Failed to analyze skills");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="page-container">

      <div className="glass-card">

        <h2
          className="hero-title"
          style={{ fontSize: "34px" }}
        >
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
            onKeyDown={(e) => {
              if (e.key === "Enter") addSkill();
            }}
          />

          <button
            className="add-btn"
            onClick={addSkill}
          >
            Add
          </button>

        </div>

        {/* Skill Chips */}
        <div className="skill-chips">

          {skills.map((skill) => (

            <div
              key={skill}
              className="chip"
            >
              {skill}

              <span
                onClick={() =>
                  removeSkill(skill)
                }
              >
                ✕
              </span>

            </div>

          ))}

        </div>

        {/* Analyze Button */}
        <button
          className="primary-btn"
          disabled={
            skills.length === 0 || loading
          }
          onClick={handleAnalyze}
        >

          {loading
            ? "Analyzing..."
            : "Analyze →"}

        </button>

      </div>

    </div>

  );

}

export default SkillInput;