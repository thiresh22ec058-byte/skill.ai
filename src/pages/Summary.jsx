import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Summary() {
  const location = useLocation();
  const navigate = useNavigate();

  const { analysis, careerGoal, skills } = location.state || {};

  // Redirect protection
  useEffect(() => {
    if (!analysis) {
      navigate("/usertype");
    }
  }, [analysis, navigate]);

  if (!analysis) return null;

  return (
    <div className="page-container">
      <div className="glass-card">

        <h2 className="hero-title">
          🎯 Career Recommendation
        </h2>

        <h3>{analysis.career}</h3>

        <p>
          <strong>Skill Gap:</strong> {analysis.skillGap}
        </p>

        <h3 style={{ marginTop: "20px" }}>📚 Learning Roadmap</h3>

        <ul>
          {analysis.roadmap.map((week, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {week}
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "20px" }}>
          <strong>Progress:</strong> {analysis.progress}%
        </p>
        <button
  className="primary-btn"
  style={{ marginTop: "20px" }}
  onClick={() =>
    navigate("/roadmap", {
      state: { analysis }
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

