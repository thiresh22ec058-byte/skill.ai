import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { cities } from "../data/cities";

const API = "http://localhost:5000/api";

function Jobs() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [jobRoles, setJobRoles] = useState([]);
  const [readiness, setReadiness] = useState(0);
  const [selectedCities, setSelectedCities] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {

    if (!token) return;

    const fetchProfile = async () => {

      try {

        const res = await axios.get(
          `${API}/users/me`,
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

    if (!profile || !token) return;

    const fetchJobs = async () => {

      try {

        setLoadingJobs(true);

        const cityQuery =
          selectedCities && selectedCities.length > 0
            ? selectedCities.map(c => c.value).join(",")
            : "";

        const res = await axios.get(
          `${API}/recommend?city=${cityQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setJobRoles(res?.data?.jobs || []);
        setReadiness(res?.data?.readiness || 0);

      } catch (err) {

        console.error("Fetch Jobs Error:", err);

      } finally {

        setLoadingJobs(false);

      }

    };

    fetchJobs();

  }, [profile, token, selectedCities]);

  /* ================= LOADING PROFILE ================= */

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

        <div className="glass-card job-landing">

          <h2 className="hero-title">
            Recommended Jobs For You
          </h2>

          {/* ================= CITY SELECTOR ================= */}

          <div
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              display: "flex",
              justifyContent: "center"
            }}
          >

            <div style={{ width: "420px" }}>

              <Select
                isMulti
                options={cities}
                placeholder="Search cities in India..."
                value={selectedCities}
                onChange={(selected) => {

                  if (selected && selected.length > 4) {
                    alert("You can select up to 4 cities only");
                    return;
                  }

                  setSelectedCities(selected || []);

                }}
                styles={{
                  control: (base) => ({
                    ...base,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "10px",
                    padding: "5px",
                    color: "white",
                    boxShadow: "0 0 10px rgba(79,70,229,0.4)"
                  }),
                  menu: (base) => ({
                    ...base,
                    background: "#111"
                  }),
                  option: (base) => ({
                    ...base,
                    background: "#111",
                    color: "white"
                  })
                }}
              />

            </div>

          </div>

          {/* ================= READINESS ================= */}

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

          {/* ================= JOB LIST ================= */}

          <div className="jobs-scroll">

            {loadingJobs ? (

              <p style={{ marginTop: "20px" }}>
                Loading jobs...
              </p>

            ) : jobRoles.length === 0 ? (

              <p style={{ marginTop: "20px" }}>
                No jobs found right now.
              </p>

            ) : (

              jobRoles.map((job, index) => (

                <div
                  key={index}
                  className="job-card"
                >

                  <h3>{job.title}</h3>

                  <p style={{ fontSize: "14px", opacity: 0.8 }}>
                    Company: {job.company}
                  </p>

                  <p style={{ fontSize: "14px", opacity: 0.8 }}>
                    Location: {job.location}
                  </p>

                  <button
                    onClick={() => window.open(job.redirect, "_blank")}
                  >
                    Apply Now
                  </button>

                </div>

              ))

            )}

          </div>

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