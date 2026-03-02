import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Roadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/roadmap/generate-roadmap",
        {
          goal: "Full Stack Developer",
          skillLevel: "beginner",
          currentSkills: ["HTML"],
          dailyHours: 3
        }
      );

      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error("Roadmap Generation Error:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    generateRoadmap();
  }, []);

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
        <h1 style={{ fontSize: "38px", marginBottom: "20px" }}>
          AI Personalized Roadmap
        </h1>

        {loading && <p>Generating AI Roadmap...</p>}

        {roadmap && (
          <div style={{ maxWidth: "900px", width: "100%" }}>
            <h2>{roadmap.title}</h2>
            <p><strong>Estimated Duration:</strong> {roadmap.estimated_duration}</p>
            <p style={{ marginBottom: "30px" }}>
              {roadmap.weekly_plan_overview}
            </p>

            {roadmap.phases.map((phase, index) => (
              <div
                key={index}
                style={{
                  background: "linear-gradient(135deg,#111827,#1f2937)",
                  padding: "25px",
                  borderRadius: "14px",
                  marginBottom: "25px"
                }}
              >
                <h3>{phase.phase_name}</h3>
                <p><strong>Duration:</strong> {phase.duration}</p>

                <p><strong>Topics:</strong></p>
                <ul>
                  {phase.topics.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>

                <p><strong>Projects:</strong></p>
                <ul>
                  {phase.projects.map((project, i) => (
                    <li key={i}>{project}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Roadmap;