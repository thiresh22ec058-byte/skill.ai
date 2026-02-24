import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CareerGoal() {
  const navigate = useNavigate();
  const location = useLocation();

  const userType = location.state?.userType || "";
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");

  const roles = [
    "Software Developer",
    "Data Analyst",
    "AI Engineer",
    "Cyber Security Specialist",
    "Full Stack Developer",
    "Core Engineer"
  ];

  const filteredRoles = roles.filter((role) =>
    role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="glass-card">

        <h2 className="hero-title" style={{ fontSize: "34px" }}>
          What Do You Want To Become?
        </h2>

        <p className="subtitle">
          Choose your dream role. AI will build your roadmap.
        </p>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search role (e.g. UI/UX Designer)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ai-input"
        />

        {/* Role Options */}
        {filteredRoles.map((role) => (
          <button
            key={role}
            className={`option-btn ${selected === role ? "selected" : ""}`}
            onClick={() => setSelected(role)}
          >
            {role}
          </button>
        ))}

        <button
          className="primary-btn"
          disabled={!selected}
          onClick={() =>
            navigate("/skills", {
              state: { userType, careerGoal: selected },
            })
          }
        >
          Next →
        </button>

      </div>
    </div>
  );
}

export default CareerGoal;