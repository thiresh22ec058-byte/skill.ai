import { useState } from "react";
import { useNavigate } from "react-router-dom";

const domains = [
  "Software Development",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "Blockchain",
  "Game Development",
  "UI/UX Design",
  "Embedded Systems",
  "IoT Engineering",

  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics Engineering",
  "Automobile Engineering",
  "Aerospace Engineering",
  "Robotics Engineering",
  "Chemical Engineering",

  "Entrepreneurship",
  "Business Management",
  "Finance & Banking",
  "Marketing",
  "Digital Marketing",
  "Human Resources",

  "Graphic Design",
  "Content Creation",
  "Video Editing",
  "Animation",

  "Healthcare & Medicine",
  "Law",
  "Education",
  "Research & Academia",

  "Environmental Science",
  "Renewable Energy",
  "Space & Astronomy",
  "Sports & Fitness"
];

function GoalSelection() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);

  const filteredDomains = domains.filter(domain =>
    domain.toLowerCase().includes(search.toLowerCase())
  );

  const handleNext = () => {
    let finalGoal = selectedGoal;

    if (!finalGoal) {
      alert("Please select a goal from suggestions");
      return;
    }

    navigate("/skills", {
      state: { careerGoal: finalGoal }
    });
  };

  return (
    <div className="page-container">
      <div className="glass-card">

        <h2>What Do You Want To Become?</h2>
        <p>Choose your dream role. AI will build your roadmap.</p>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search role..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedGoal(null);  // reset selection
          }}
          className="ai-input"
        />

        {/* Suggestions */}
        {search && (
          <div style={{ marginTop: "10px" }}>
            {filteredDomains.map((domain, index) => (
              <div
                key={index}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  background:
                    selectedGoal === domain ? "#334155" : "#1e293b",
                  marginBottom: "5px",
                  borderRadius: "6px"
                }}
                onClick={() => {
                  setSelectedGoal(domain);
                  setSearch(domain);
                }}
              >
                {domain}
              </div>
            ))}
          </div>
        )}

        {/* Default Popular Goals (Always Visible) */}
        <div style={{ marginTop: "20px" }}>
          <h4>Popular Goals</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              "Software Development",
              "Data Science",
              "Entrepreneurship",
              "Healthcare & Medicine",
              "Cybersecurity"
            ].map((goal, i) => (
              <button
                key={i}
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    selectedGoal === goal ? "#4f46e5" : "#1e293b",
                  color: "white"
                }}
                onClick={() => {
                  setSelectedGoal(goal);
                  setSearch(goal);
                }}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          className="primary-btn"
          style={{ marginTop: "25px" }}
          onClick={handleNext}
        >
          Next →
        </button>

      </div>
    </div>
  );
}

export default GoalSelection;