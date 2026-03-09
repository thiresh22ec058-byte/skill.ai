import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Jobs() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [jobRoles, setJobRoles] = useState([]);
  const [readiness, setReadiness] = useState(0);

  const token = localStorage.getItem("token");
  const goal = localStorage.getItem("careerGoal");

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {

    if (!token) return;

    const fetchProfile = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/users/me",
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

  }, [token]);

  /* ================= FETCH JOBS ================= */

  useEffect(() => {

    if (!profile) return;

    const fetchJobs = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/recommend",
          {
            params: {
              goal
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setJobRoles(res.data.jobs || []);
        setReadiness(res.data.readiness || 0);

      } catch (err) {

        console.error("Fetch Jobs Error:", err);

      }

    };

    fetchJobs();

  }, [profile, goal, token]);

  /* ================= LOADING ================= */

  if (!profile) {

    return (
      <>
        <Navbar />
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          Loading jobs...
        </div>
      </>
    );

  }

  return (
    <>
      <Navbar />

      <div className="page-container">

        <div className="glass-card">

          <h2 className="hero-title">
            Recommended Jobs For You
          </h2>

          {/* ================= JOB READINESS ================= */}

          <div style={{ marginTop: "15px", marginBottom: "25px" }}>

            <h3>Job Readiness: {readiness}%</h3>

            <div
              style={{
                height: "10px",
                width: "100%",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "8px"
              }}
            >

              <div
                style={{
                  width: `${readiness}%`,
                  height: "100%",
                  background: "linear-gradient(90deg,#4f46e5,#22d3ee)",
                  transition: "0.5s"
                }}
              />

            </div>

            <p style={{ marginTop: "8px", color: "#facc15" }}>
              Complete more roadmap weeks and projects to increase your job readiness.
            </p>

          </div>

          {/* ================= JOB ROLES ================= */}

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

          {/* ================= NAVIGATION ================= */}

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