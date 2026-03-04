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

        {/* Career Goal */}
        <p style={{ marginTop: "10px", opacity: "0.8" }}>
          Career Goal: <strong>{analysis.career}</strong>
        </p>

        {/* Progress Score */}
        <div style={{ marginTop: "25px" }}>

          <h3>Readiness Score: {analysis.progress}%</h3>

          <div
            style={{
              height: "10px",
              background: "#374151",
              borderRadius: "10px",
              marginTop: "8px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: `${analysis.progress}%`,
                height: "100%",
                background: "linear-gradient(90deg,#4f46e5,#22d3ee)"
              }}
            />
          </div>

        </div>

        {/* Skills You Have */}
        <div
          className="analysis-box"
          style={{ marginTop: "25px" }}
        >

          <h3>✅ Skills You Have</h3>

          {analysis.skillsHave?.length > 0 ? (

            analysis.skillsHave.map((skill, index) => (
              <div key={index}>{skill}</div>
            ))

          ) : (

            <p>No skills added</p>

          )}

        </div>

        {/* Skills Missing */}
        <div
          className="analysis-box"
          style={{ marginTop: "25px" }}
        >

          <h3>❌ Skills Missing for Your Goal</h3>

          {analysis.skillsMissing?.length > 0 ? (

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
          style={{ marginTop: "30px" }}
          onClick={() => navigate("/roadmap")}
        >
          Start Learning →
        </button>

      </div>

    </div>
  );

}

export default Summary;