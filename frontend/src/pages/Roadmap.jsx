import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Roadmap() {

  const [roadmap, setRoadmap] = useState(null);
  const [progressData, setProgressData] = useState(null);

  const token = localStorage.getItem("token");
  const goal = localStorage.getItem("careerGoal");

  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${token}`
  };

  /* ================= FETCH ROADMAP ================= */

  const fetchRoadmap = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/roadmap",
        { goal },
        { headers }
      );

      setRoadmap(res.data.roadmap);

    } catch (err) {

      console.error("Roadmap Fetch Error:", err);

    }

  };

  /* ================= FETCH USER PROGRESS ================= */

  const fetchProgress = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/roadmap/user-progress",
        { headers }
      );

      setProgressData(res.data);

    } catch (err) {

      console.error("Progress Fetch Error:", err);

    }

  };

  useEffect(() => {

    if (token && goal) {

      fetchRoadmap();
      fetchProgress();

    }

  }, [token, goal]);

  /* ================= COMPLETE PHASE ================= */

  const markComplete = async (phaseNumber) => {

    try {

      await axios.post(
        "http://localhost:5000/api/roadmap/complete-phase",
        {
          goal,
          phaseNumber
        },
        { headers }
      );

      fetchRoadmap();
      fetchProgress();

    } catch (err) {

      console.error("Complete Phase Error:", err);

    }

  };

  if (!roadmap) return null;

  const progress = progressData?.progressPercent || 0;

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
          {roadmap.title} Roadmap
        </h1>

        <p
          style={{
            marginBottom: "30px",
            color: "#facc15",
            textAlign: "center"
          }}
        >
          Complete phases to unlock job recommendations.
        </p>

        <div
          style={{
            width: "100%",
            maxWidth: "800px"
          }}
        >

          {roadmap.phases.map((phase) => {

            /* Handle topic formats safely */
            const topics = phase.topics || [];

            const playlist =
              phase.playlist ||
              phase.projectVideo ||
              (topics[0] && topics[0].video);

            return (

              <div
                key={phase.phase}
                style={{
                  background: "linear-gradient(135deg,#111827,#1f2937)",
                  padding: "25px",
                  borderRadius: "14px",
                  marginBottom: "25px"
                }}
              >

                <h3 style={{ marginBottom: "8px" }}>
                  Phase {phase.phase} — {phase.name}
                </h3>

                <p style={{ marginBottom: "6px" }}>
                  Duration: {phase.duration}
                </p>

                {/* ================= TOPICS ================= */}

                <div style={{ marginBottom: "10px" }}>

                  <strong>Topics:</strong>

                  {topics.map((topic, i) => {

                    if (typeof topic === "string") {
                      return <div key={i}>{topic}</div>;
                    }

                    return (
                      <div key={i}>
                        {topic.title}
                      </div>
                    );

                  })}

                </div>

                {/* ================= PLAYLIST ================= */}

                {playlist && (

                  <a
                    href={playlist}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      marginBottom: "10px",
                      color: "#3b82f6",
                      fontWeight: "500"
                    }}
                  >
                    ▶ Watch Course
                  </a>

                )}

                {/* ================= STATUS ================= */}

                <p style={{ marginBottom: "12px" }}>
                  Status:{" "}
                  <strong
                    style={{
                      color:
                        phase.status === "completed"
                          ? "#22c55e"
                          : phase.status === "unlocked"
                          ? "#facc15"
                          : "#9ca3af"
                    }}
                  >
                    {phase.status}
                  </strong>
                </p>

                {/* ================= COMPLETE BUTTON ================= */}

                {phase.status === "unlocked" && (

                  <button
                    onClick={() => markComplete(phase.phase)}
                    style={{
                      padding: "8px 14px",
                      background: "#2563eb",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      cursor: "pointer"
                    }}
                  >
                    Complete Phase
                  </button>

                )}

              </div>

            );

          })}

          {/* ================= PROGRESS BAR ================= */}

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