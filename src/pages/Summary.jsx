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

  // ✅ Safe fallback arrays
  const skillsHave = analysis.skillsHave || [];
  const skillsMissing = analysis.skillsMissing || [];
  const skillsImprove = analysis.skillsImprove || [];

  return (
    <div className="page-container">
      <div className="glass-card">

        <h2 className="hero-title">
          🧠 Your Skill Analysis
        </h2>

        {/* Skills You Have */}
        <div className="analysis-box success">
          <h3>✅ Skills You Have</h3>
          <ul>
            {skillsHave.length > 0 ? (
              skillsHave.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))
            ) : (
              <li>No matching skills yet</li>
            )}
          </ul>
        </div>

        {/* Skills To Improve */}
        <div className="analysis-box warning">
          <h3>⚠ Skills To Improve</h3>
          <ul>
            {skillsImprove.length > 0 ? (
              skillsImprove.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))
            ) : (
              <li>Improve fundamentals</li>
            )}
          </ul>
        </div>

        {/* Skills Missing */}
        <div className="analysis-box danger">
          <h3>❌ Skills Missing for Your Goal</h3>
          <ul>
            {skillsMissing.length > 0 ? (
              skillsMissing.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))
            ) : (
              <li>No missing skills detected</li>
            )}
          </ul>
        </div>

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