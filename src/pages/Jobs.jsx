import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Jobs() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [jobRoles, setJobRoles] = useState([]);

  const token = localStorage.getItem("token");

  // 🔹 Fetch Profile
  useEffect(() => {
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
        console.error("Fetch Profile Error:", err);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Fetch Jobs From Backend (Dynamic)
  useEffect(() => {
    if (!profile) return;

    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/jobs",
          {
            params: {
              readiness: profile.stats.jobReadinessPercent,
              domain: profile.careerGoal
            }
          }
        );

        setJobRoles(res.data);

      } catch (err) {
        console.error("Fetch Jobs Error:", err);
      }
    };

    fetchJobs();

  }, [profile]);

  if (!profile) return null;

  const readiness = profile.stats.jobReadinessPercent;

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="glass-card">

          <h2 className="hero-title">
            Recommended Jobs For You
          </h2>

          {/* 🔥 Job Readiness Section */}
          <div style={{ marginTop: "15px", marginBottom: "25px" }}>
            <h3>Job Readiness: {readiness}%</h3>

            <div style={{
              height: "10px",
              width: "100%",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "8px"
            }}>
              <div style={{
                width: `${readiness}%`,
                height: "100%",
                background: "linear-gradient(90deg,#4f46e5,#22d3ee)",
                transition: "0.5s"
              }} />
            </div>

            <p style={{ marginTop: "8px", color: "#facc15" }}>
              Complete more roadmap weeks and projects to increase your job readiness.
            </p>
          </div>

          {/* 🔥 Dynamic Job Roles */}
          {jobRoles.map((job, index) => (
            <div
              key={index}
              className="analysis-box"
              style={{ marginTop: "15px" }}
            >
              <h3>{job}</h3>

              <p style={{ fontSize: "14px", opacity: 0.8 }}>
                Location: Bangalore | India
              </p>

              <p style={{ fontSize: "14px", opacity: 0.8 }}>
                Salary: ₹4L – ₹12L per annum
              </p>

              <button
                style={{ marginTop: "10px" }}
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?q=${job}+jobs+india`,
                    "_blank"
                  )
                }
              >
                Apply Now
              </button>
            </div>
          ))}

          {/* Navigation Buttons */}
          <div style={{ marginTop: "30px" }}>
            <button
              className="primary-btn"
              onClick={() => navigate("/profile")}
              style={{ marginRight: "15px" }}
            >
              Go To Profile
            </button>

            <button
              className="primary-btn"
              onClick={() => navigate("/roadmap")}
            >
              Continue Learning
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Jobs;