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
  "Product Management (Tech)",
  "Embedded Systems",
  "IoT Engineering",

  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics Engineering",
  "Automobile Engineering",
  "Aerospace Engineering",
  "Robotics Engineering",
  "Mechatronics",
  "Industrial Engineering",
  "Chemical Engineering",

  "Entrepreneurship",
  "Startup Founder",
  "Business Management",
  "Finance & Banking",
  "Investment & Trading",
  "Marketing",
  "Digital Marketing",
  "Human Resources",
  "Operations Management",
  "Supply Chain Management",

  "Graphic Design",
  "Content Creation",
  "Video Editing",
  "Animation",
  "Photography",

  "Healthcare & Medicine",
  "Law",
  "Education",
  "Research & Academia",
  "Government Services",

  "Environmental Science",
  "Renewable Energy",
  "Agriculture Technology",
  "Space & Astronomy",
  "Sports & Fitness"
];

function GoalSelection() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");

  const filteredDomains = domains.filter(domain =>
    domain.toLowerCase().includes(search.toLowerCase())
  );

  const handleNext = () => {
    const finalGoal = selectedGoal || search;

    if (!finalGoal.trim()) {
      alert("Please select or type a goal");
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

        <input
          type="text"
          placeholder="Search role..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedGoal("");
          }}
          className="ai-input"
        />

        {/* Suggestions */}
        {search && (
          <div style={{ marginTop: "10px", maxHeight: "200px", overflowY: "auto" }}>
            {filteredDomains.map((domain, index) => (
              <div
                key={index}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  background: "#1e293b",
                  marginBottom: "5px",
                  borderRadius: "5px"
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

        <button
          className="primary-btn"
          style={{ marginTop: "20px" }}
          onClick={handleNext}
        >
          Next →
        </button>

      </div>
    </div>
  );
}

export default GoalSelection;