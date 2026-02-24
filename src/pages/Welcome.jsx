import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="glass-card">

        <h1 className="hero-title">
          Learn. Build. Succeed.
        </h1>

        <p className="subtitle">
          A smart AI-powered platform that helps students choose the right skills,
          follow a structured roadmap, and become job-ready.
        </p>

        <button
          className="primary-btn"
          onClick={() => navigate("/usertype")}
        >
          Get Started →
        </button>

      </div>
    </div>
  );
}

export default Welcome;