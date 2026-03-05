import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Progress() {
  const location = useLocation();
  const navigate = useNavigate();

  const { roadmap, careerGoal } = location.state || {};

  if (!roadmap) {
    return (
      <Layout>
        <div className="fade-in">
          <div className="glass-card">
            <h2 className="hero-title">No Progress Data</h2>
          </div>
        </div>
      </Layout>
    );
  }

  const allTasks = roadmap.flatMap((week) => week.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = Math.floor(totalTasks / 2);
  const progressPercent = Math.round(
    (completedTasks / totalTasks) * 100
  );

  return (
    <Layout>
      <div className="fade-in">
        <div className="glass-card">

          <h2 className="hero-title" style={{ fontSize: "32px" }}>
            Your Progress
          </h2>

          <p className="subtitle">
            Career Goal: <strong>{careerGoal}</strong>
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <p style={{ marginTop: "10px" }}>
            {progressPercent}% Completed
          </p>

          <div className="analysis-box">
            <h4>✅ Completed Tasks</h4>
            {allTasks.slice(0, completedTasks).map((task, i) => (
              <p key={i}>• {task}</p>
            ))}
          </div>

          <div className="analysis-box">
            <h4>⚠ Remaining Tasks</h4>
            {allTasks.slice(completedTasks).map((task, i) => (
              <p key={i}>• {task}</p>
            ))}
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/jobready", {
                state: { progressPercent }
              })
            }
          >
            Check Job Readiness →
          </button>

        </div>
      </div>
    </Layout>
  );
}

export default Progress;