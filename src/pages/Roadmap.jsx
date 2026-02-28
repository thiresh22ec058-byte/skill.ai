import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Roadmap() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
      console.error("Roadmap Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const markComplete = async (index) => {
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

      fetchProfile(); // reload updated data
    } catch (err) {
      console.error("Update Week Error:", err);
    }
  };

  if (!profile) return null;

  const progress = profile.stats?.progressPercent || 0;

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          padding: "60px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            marginBottom: "10px",
            textAlign: "center"
          }}
        >
          Learning Roadmap
        </h1>

        <p
          style={{
            marginBottom: "30px",
            color: "#facc15",
            textAlign: "center"
          }}
        >
          Complete at least 60% of your roadmap to unlock job recommendations.
        </p>

        <div
          style={{
            width: "100%",
            maxWidth: "800px"
          }}
        >
          {profile.roadmapProgress?.map((week, index) => (
            <div
              key={index}
              style={{
                background: "linear-gradient(135deg,#111827,#1f2937)",
                padding: "25px",
                borderRadius: "14px",
                marginBottom: "25px"
              }}
            >
              <h3 style={{ marginBottom: "8px" }}>
                {week.week}
              </h3>

              <p style={{ marginBottom: "6px" }}>
                {week.topics[0]}
              </p>

              <p style={{ marginBottom: "12px" }}>
                Status:{" "}
                <strong
                  style={{
                    color:
                      week.status === "completed"
                        ? "#22c55e"
                        : week.status === "in-progress"
                        ? "#facc15"
                        : "#9ca3af"
                  }}
                >
                  {week.status}
                </strong>
              </p>

              {profile.playlistId && (
                <a
                  href={`https://www.youtube.com/playlist?list=${profile.playlistId}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginRight: "15px",
                    color: "#3b82f6",
                    fontWeight: "500"
                  }}
                >
                  ▶ Start Learning
                </a>
              )}

              {week.status !== "completed" && (
                <button
                  onClick={() => markComplete(index)}
                  style={{
                    padding: "8px 14px",
                    background: "#2563eb",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  Mark Complete
                </button>
              )}
            </div>
          ))}

          {/* Progress Section */}
          <div
            style={{
              marginTop: "30px",
              textAlign: "center"
            }}
          >
            <h3>Progress: {progress}%</h3>

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
                  width: `${progress}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg,#4f46e5,#22d3ee)"
                }}
              />
            </div>

            {progress >= 60 && (
              <button
                onClick={() => navigate("/jobs")}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  background: "#16a34a",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                View Job Recommendations →
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Roadmap;