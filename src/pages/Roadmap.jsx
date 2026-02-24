import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Roadmap() {
  const location = useLocation();
  const navigate = useNavigate();

  const { careerGoal, skillsYouHave, skillsMissing } = location.state || {};

  const generateRoadmap = () => {
    if (!skillsMissing || skillsMissing.length === 0) {
      return [
        { title: "Week 1–2", tasks: ["Revise core concepts"] },
        { title: "Week 3–4", tasks: ["Build 1 project"] }
      ];
    }

    return skillsMissing.map((skill, index) => ({
      title: `Week ${index * 2 + 1}–${index * 2 + 2}`,
      tasks: [`Learn ${skill}`, `Practice ${skill}`]
    }));
  };

  const roadmap = generateRoadmap();

  return (
    <Layout>
      <div className="fade-in">
        <div className="glass-card">

          <h2 className="hero-title" style={{ fontSize: "32px" }}>
            Your Learning Roadmap
          </h2>

          <p className="subtitle">
            AI-generated roadmap for <strong>{careerGoal}</strong>
          </p>

          {roadmap.map((week, index) => (
            <div key={index} className="analysis-box">
              <h4>{week.title}</h4>
              {week.tasks.map((task, i) => (
                <p key={i}>• {task}</p>
              ))}
            </div>
          ))}

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/progress", {
                state: {
                  careerGoal,
                  roadmap,
                  skillsYouHave,
                  skillsMissing
                }
              })
            }
          >
            Check Progress →
          </button>

        </div>
      </div>
    </Layout>
  );
}

export default Roadmap;