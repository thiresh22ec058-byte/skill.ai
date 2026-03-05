import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CareerGoal() {

  const navigate = useNavigate();
  const location = useLocation();

  const userType = location.state?.userType || "";

  const [goalInput, setGoalInput] = useState("");

  const handleNext = () => {

    const trimmed = goalInput.trim();

    if (!trimmed) return;

    localStorage.setItem("careerGoal", goal);

navigate("/skills", {
  state: { careerGoal: goal }
});

  };

  return (

    <div className="page-container">

      <div className="glass-card">

        <h2
          className="hero-title"
          style={{ fontSize: "34px" }}
        >
          What Do You Want To Become?
        </h2>

        <p className="subtitle">
          Tell us your dream career. SkillAI will generate your roadmap.
        </p>

        {/* Career Input */}
        <input
          type="text"
          placeholder="Example: AI Engineer, Web Developer, Data Scientist"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          className="ai-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleNext();
          }}
        />

        <button
          className="primary-btn"
          disabled={!goalInput.trim()}
          onClick={handleNext}
        >
          Generate Roadmap →
        </button>

      </div>

    </div>

  );

}

export default CareerGoal;