import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Roadmap() {
  const location = useLocation();
  const navigate = useNavigate();

  const { analysis } = location.state || {};

  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (!analysis) {
      navigate("/");
    }
  }, [analysis, navigate]);

  if (!analysis || !analysis.roadmap) return null;

  const toggleComplete = (index) => {
    if (completed.includes(index)) {
      setCompleted(completed.filter((i) => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  const progress = analysis.roadmap.length
    ? Math.round((completed.length / analysis.roadmap.length) * 100)
    : 0;

  return (
    <div className="page-container">
      <div className="glass-card">
        <h2>📚 Learning Plan</h2>

        {analysis.roadmap.map((item, index) => (
          <div key={index} style={{ marginBottom: "25px" }}>
            
            {/* Topic Title */}
            <h3>{item.title}</h3>

            {/* Playlist Link */}
            <div style={{ marginLeft: "20px", marginBottom: "8px" }}>
              <a
                href={item.playlist}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4fa3ff", textDecoration: "none" }}
              >
                ▶ Watch Full Playlist
              </a>
            </div>

            {/* Complete Button */}
            <button
              style={{ marginTop: "10px" }}
              onClick={() => toggleComplete(index)}
            >
              {completed.includes(index)
                ? "Completed ✓"
                : "Mark Complete"}
            </button>
          </div>
        ))}

        {/* Progress Section */}
        <h3 style={{ marginTop: "20px" }}>
          Progress: {progress}%
        </h3>

        {/* Unlock Jobs */}
        {progress >= 60 && (
          <button
            className="primary-btn"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/jobs")}
          >
            View Recommended Jobs →
          </button>
        )}
      </div>
    </div>
  );
}

export default Roadmap;