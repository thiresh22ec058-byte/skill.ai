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

    if (!selectedCities || selectedCities.length === 0) {
      setJobRoles([]);
      return;
    }

    const fetchJobs = async () => {

      try {

        setLoadingJobs(true);

        const cityQuery =
          selectedCities.map(c => c.value).join(",");

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

          
          {/* ================= JOB COUNT ================= */}

          {selectedCities.length > 0 && (

            <p style={{ marginBottom: "15px", opacity: 0.8 }}>
              Showing {jobRoles.length} jobs in {selectedCities.map(c => c.label).join(", ")}
            </p>

          )}

          {/* ================= JOB LIST ================= */}

          <div className="jobs-scroll">

            {selectedCities.length === 0 ? (

              <p style={{ marginTop: "20px", fontSize: "16px", opacity: 0.8 }}>
                Select a city to view job opportunities tailored to your career goal.
              </p>

            ) : loadingJobs ? (

              <p style={{ marginTop: "20px" }}>
                Loading jobs...
              </p>

            ) : jobRoles.length === 0 ? (

              <p style={{ marginTop: "20px" }}>
                No jobs found for the selected city. Try selecting another city.
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
                    className="apply-btn"
                    title="Open job application"
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