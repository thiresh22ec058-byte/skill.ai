import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Summary() {

  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);

  /* ================= LOAD ANALYSIS ================= */
  useEffect(() => {

    const stored = localStorage.getItem("analysis");

    if (!stored) {
      navigate("/");
      return;
    }

    try {

      const parsed = JSON.parse(stored);

      if (!parsed || typeof parsed !== "object") {
        navigate("/");
        return;
      }

      setAnalysis(parsed);

    } catch (error) {

      console.error("Invalid analysis data:", error);
      navigate("/");

    }

  }, [navigate]);

  /* ================= LOADING STATE ================= */
  if (!analysis) {
    return <div>Loading...</div>;
  }

  /* ================= SAFE DATA EXTRACTION ================= */

  const career =
    analysis?.career ||
    analysis?.bestCareer?.title ||
    "Unknown Career";

  const skillsHave = Array.isArray(analysis?.skillsHave)
    ? analysis.skillsHave
    : Array.isArray(analysis?.detectedSkills)
    ? analysis.detectedSkills
    : [];

  const skillsMissing = Array.isArray(analysis?.skillsMissing)
    ? analysis.skillsMissing
    : Array.isArray(analysis?.skillGaps)
    ? analysis.skillGaps
    : [];

  const progress = Number(
    analysis?.progress ||
    analysis?.bestCareer?.score ||
    0
  );

  /* ================= UI ================= */

  return (

    <div className="page-container">

      <div className="glass-card">

        <h2 className="hero-title">
          Your Skill Analysis
        </h2>

        <p>
          Career Goal: <b>{career}</b>
        </p>

        <h3>
          Readiness Score: {progress}%
        </h3>

        {/* Progress Bar */}

        <div
          style={{
            width: "100%",
            height: "10px",
            background: "#1e293b",
            borderRadius: "10px",
            marginBottom: "20px"
          }}
        >

          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background:
                "linear-gradient(90deg,#7c3aed,#06b6d4)",
              borderRadius: "10px"
            }}
          />

        </div>

        {/* Skills You Have */}

        <div className="analysis-card">

          <h3>✅ Skills You Have</h3>

          {skillsHave.length > 0 ? (

            <ul>
              {skillsHave.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

          ) : (

            <p>No skills detected</p>

          )}

        </div>

        {/* Missing Skills */}

        <div className="analysis-card">

          <h3>❌ Skills Missing for Your Goal</h3>

          {skillsMissing.length > 0 ? (

            <ul>
              {skillsMissing.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

          ) : (

            <p>No missing skills 🎉</p>

          )}

        </div>

        {/* Navigate to Roadmap */}

        <button
          className="primary-btn"
          onClick={() => navigate("/roadmap")}
        >
          Start Learning →
        </button>

      </div>

    </div>

  );
}

export default Summary;