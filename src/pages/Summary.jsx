import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Summary() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("analysis");

    if (stored) {
      setAnalysis(JSON.parse(stored));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!analysis) return null;

  return (
    <div className="page-container">
      <div className="glass-card">
        <h2 className="hero-title">
          Your Skill Analysis
        </h2>

        {/* Skills You Have */}
        <div className="analysis-box" style={{ marginTop: "20px" }}>
          <h3>✅ Skills You Have</h3>

          {analysis.skillsHave?.length > 0 ? (
            analysis.skillsHave.map((skill, index) => (
              <div key={index}>{skill}</div>
            ))
          ) : (
            <p>No skills added</p>
          )}

          {/* ❌ Skills Missing */}
<div className="analysis-box" style={{ marginTop: "20px" }}>
  <h3>❌ Skills Missing for Your Goal</h3>

  {analysis.skillsMissing?.length > 0 ? (
    analysis.skillsMissing.map((skill, index) => (
      <div key={index}>{skill}</div>
    ))
  ) : (
    <p>No missing skills 🎉</p>
  )}
</div>

        </div>

        <button
          className="primary-btn"
          style={{ marginTop: "25px" }}
          onClick={() => navigate("/roadmap")}
        >
          Start Learning →
        </button>
      </div>
    </div>
  );
}

export default Summary;