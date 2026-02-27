import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Roadmap() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProfile(res.data);
    } catch (err) {
      console.error("Fetch Roadmap Error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const toggleComplete = async (index) => {
    try {
      await axios.put(
        "http://localhost:5000/api/profile/update-week",
        { weekIndex: index },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Reload updated roadmap from backend
      fetchProfile();

    } catch (err) {
      console.error("Update Week Error:", err);
    }
  };

  if (!profile) return null;

  const progress = profile.stats?.progressPercent || 0;

  return (
    <>
      {/* ✅ Navbar on TOP */}
      <Navbar />

      <div className="page-container">
        <div className="glass-card">

          <h2 className="hero-title">
            Your Learning Roadmap
          </h2>

          {/* ✅ Use roadmapProgress (correct key) */}
          {profile.roadmapProgress?.map((week, index) => (
            <div
              key={index}
              className="analysis-box"
              style={{ marginTop: "20px" }}
            >
              <h3>{week.week}</h3>

              <ul style={{ marginLeft: "15px" }}>
                {week.topics?.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>

              <p>Status: {week.status}</p>

              {/* 🔥 If you later store videoId in DB you can use it here */}
              {/* For now just show learning button */}
              <a
                href={`https://www.youtube.com/results?search_query=${week.topics?.[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#4fa3ff",
                  display: "inline-block",
                  marginTop: "10px"
                }}
              >
                ▶ Start Learning
              </a>

              {week.status !== "completed" && (
                <div>
                  <button
                    style={{ marginTop: "10px" }}
                    onClick={() => toggleComplete(index)}
                  >
                    Mark Week Complete
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* ✅ Progress Section */}
          <h3 style={{ marginTop: "30px" }}>
            Progress: {progress}%
          </h3>

          <p style={{ color: "#facc15", marginTop: "5px" }}>
            Complete at least 60% of your roadmap to unlock job recommendations.
          </p>

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
    </>
  );
}

export default Roadmap;