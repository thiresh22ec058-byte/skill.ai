import { useLocation, useNavigate } from "react-router-dom";

function Summary() {

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  const goal = data.goal || "Unknown Goal";

  const skillsYouHave = Array.isArray(data.skillsYouHave)
    ? data.skillsYouHave
    : [];

  const missingSkills = Array.isArray(data.missingSkills)
    ? data.missingSkills
    : [];

  const readiness = data.readinessScore || 0;

  return (
    <div className="page-container">

      <div className="glass-card">

        <h1 className="hero-title">
          Your Skill Analysis
        </h1>

        <p style={{ marginTop: "10px" }}>
          Career Goal: <strong>{goal}</strong>
        </p>

        <p>
          Readiness Score: <strong>{readiness}%</strong>
        </p>

        <div
          style={{
            height: "10px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "10px",
            marginTop: "10px",
            marginBottom: "30px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${readiness}%`,
              height: "100%",
              background: "linear-gradient(90deg,#4f46e5,#22d3ee)"
            }}
          />
        </div>

        {/* Skills You Have */}

        <h3 style={{ marginBottom: "10px" }}>
          ✅ Skills You Have
        </h3>

        {skillsYouHave.length === 0 ? (
          <p style={{ opacity: 0.7 }}>
            No matching skills detected
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
  {skillsYouHave.map((skill, index) => (
    <li key={index}>{skill}</li>
  ))}
</ul>
        )}

        {/* Missing Skills */}

        <h3 style={{ marginTop: "25px", marginBottom: "10px" }}>
          ❌ Skills Missing for Your Goal
        </h3>

        {missingSkills.length === 0 ? (
          <p style={{ opacity: 0.7 }}>
            No missing skills detected
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
  {missingSkills.map((skill, index) => (
    <li key={index}>{skill}</li>
  ))}
</ul>
        )}

        <button
          className="primary-btn"
          style={{ marginTop: "35px" }}
          onClick={() => navigate("/roadmap")}
        >
          Start Learning →
        </button>

      </div>

    </div>
  );
}

export default Summary;