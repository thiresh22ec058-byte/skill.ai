import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    careerGoal = "Not Selected",
    progressPercent = 0,
    jobReadiness: passedJobReadiness
  } = location.state || {};

  const jobReadiness =
    passedJobReadiness !== undefined
      ? passedJobReadiness
      : Math.min(progressPercent + 20, 100);

  return (
    <Layout>
      <div className="fade-in">
        <div className="glass-card">

          <h2 className="hero-title" style={{ fontSize: "32px" }}>
            Your Profile Dashboard
          </h2>

          <div className="analysis-box">
            <h4>🎯 Career Goal</h4>
            <p>{careerGoal}</p>
          </div>

          <div className="analysis-box">
            <h4>📊 Progress</h4>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p style={{ marginTop: "10px" }}>
              {progressPercent}% Completed
            </p>
          </div>

          <div className="analysis-box">
            <h4>💼 Job Readiness</h4>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${jobReadiness}%` }}
              ></div>
            </div>
            <p style={{ marginTop: "10px" }}>
              {jobReadiness}% Job Ready
            </p>
          </div>

          <div className="analysis-box">
            <h4>🛠 My Projects</h4>
            <p>• Calculator App</p>
            <p>• Student Database System</p>
          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/roadmap")}
          >
            Continue Learning →
          </button>

        </div>
      </div>
    </Layout>
  );
}

export default Profile;