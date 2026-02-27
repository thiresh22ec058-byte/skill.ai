import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Summary() {
  const location = useLocation();
  const navigate = useNavigate();

  const { analysis } = location.state || {};

  useEffect(() => {
    if (!analysis) {
      navigate("/");
    }
  }, [analysis, navigate]);

  if (!analysis) return null;

  return (
    <div className="page-container">
      <div className="glass-card">

        <h2 className="hero-title">
          Your Skill Analysis
        </h2>

        {/* ✅ Skills You Have */}
        <div className="analysis-box" style={{ marginTop: "20px" }}>
          <h3>✅ Skills You Have</h3>

          {analysis.skillsHave && analysis.skillsHave.length > 0 ? (
            analysis.skillsHave.map((skill, index) => (
              <div key={index}>{skill}</div>
            ))
          ) : (
            <p>No skills added yet</p>
          )}
        </div>

        {/* ⚠ Skills To Improve */}
        <div className="analysis-box" style={{ marginTop: "20px" }}>
          <h3>⚠ Skills To Improve</h3>

          {analysis.skillsImprove && analysis.skillsImprove.length > 0 ? (
            analysis.skillsImprove.map((skill, index) => (
              <div key={index}>{skill}</div>
            ))
          ) : (
            <p>No improvement suggestions</p>
          )}
        </div>

        {/* ❌ Skills Missing */}
        <div className="analysis-box" style={{ marginTop: "20px" }}>
          <h3>❌ Skills Missing for Your Goal</h3>

          {analysis.skillsMissing && analysis.skillsMissing.length > 0 ? (
            analysis.skillsMissing.map((skill, index) => (
              <div key={index}>{skill}</div>
            ))
          ) : (
            <p>No missing skills 🎉</p>
          )}
        </div>

        {/* Start Learning Button */}
        <button
          className="primary-btn"
          style={{ marginTop: "25px" }}
          onClick={() =>
            navigate("/roadmap", { state: { analysis } })
          }
        >
          Start Learning →
        </button>

      </div>
    </div>
  );
}

export default Summary;