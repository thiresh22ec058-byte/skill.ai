import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function JobReady() {
  const location = useLocation();
  const navigate = useNavigate();

  const { progressPercent } = location.state || { progressPercent: 0 };

  const jobReadiness = Math.min(progressPercent + 20, 100);

  let statusMessage = "";
  if (jobReadiness >= 85) {
    statusMessage = "You are Job Ready! 🚀";
  } else if (jobReadiness >= 70) {
    statusMessage = "Almost There! Keep Going 🔥";
  } else {
    statusMessage = "Keep Learning to Become Job Ready 💡";
  }

  return (
    <Layout>
      <div className="fade-in">
        <div className="glass-card">

          <h2 className="hero-title" style={{ fontSize: "32px" }}>
            Job Readiness Status
          </h2>

          <div className="progress-bar" style={{ marginTop: "25px" }}>
            <div
              className="progress-fill"
              style={{ width: `${jobReadiness}%` }}
            ></div>
          </div>

          <p style={{ marginTop: "15px", fontSize: "20px", fontWeight: "600" }}>
            {jobReadiness}% Job Ready
          </p>

          <p className="subtitle" style={{ marginTop: "10px" }}>
            {statusMessage}
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/profile", {
                state: { progressPercent, jobReadiness }
              })
            }
          >
            Go To Profile →
          </button>

        </div>
      </div>
    </Layout>
  );
}

export default JobReady;