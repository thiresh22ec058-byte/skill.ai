import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserType() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const options = [
    "College Student",
    "Final Year Student",
    "Fresher",
    "Working Professional"
  ];

  return (
    <div className="page-container">
      <div className="glass-card">

        <h2 className="hero-title" style={{fontSize: "36px"}}>
          Who Are You?
        </h2>

        <p className="subtitle">
          Select your current stage. You can change it later.
        </p>

        {options.map((option) => (
          <button
            key={option}
            className={`option-btn ${selected === option ? "selected" : ""}`}
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        ))}

        <button
          className="primary-btn"
          disabled={!selected}
          onClick={() => navigate("/careergoal", { state: { userType: selected } })}
        >
          Continue →
        </button>

      </div>
    </div>
  );
}

export default UserType;