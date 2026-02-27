import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    link: ""
  });

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProfile(res.data);
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const markWeekComplete = async (index) => {
    try {
      await axios.put(
        "http://localhost:5000/api/profile/update-week",
        { weekIndex: index },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchProfile();
    } catch (err) {
      console.error("Week Update Error:", err);
    }
  };

  const addProject = async () => {
    if (!newProject.title || !newProject.link) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/profile/add-project",
        newProject,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setNewProject({ title: "", link: "" });
      fetchProfile();
    } catch (err) {
      console.error("Add Project Error:", err);
    }
  };

  if (!profile) return null;

  const progress = profile.stats.progressPercent;
  const readiness = profile.stats.jobReadinessPercent;

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="glass-card">

          {/* HEADER */}
          <h2 className="hero-title">{profile.name}</h2>
          <p style={{ opacity: 0.7 }}>
            {profile.year} • {profile.stream}
          </p>

          {/* CAREER GOAL */}
          <div className="analysis-box" style={{ marginTop: "20px" }}>
            <h3>Career Goal</h3>
            <p>{profile.careerGoal}</p>
          </div>

          {/* OVERVIEW */}
          <div className="analysis-box" style={{ marginTop: "20px" }}>
            <h3>Learning Overview</h3>

            <p>Learning Progress: {progress}%</p>
            <div style={barStyle}>
              <div style={{ ...fillStyle, width: `${progress}%` }} />
            </div>

            <p style={{ marginTop: "10px" }}>
              Job Readiness: {readiness}%
            </p>
            <div style={barStyle}>
              <div style={{ ...fillStyle, width: `${readiness}%` }} />
            </div>
          </div>

          {/* STUDY PLAN */}
          <div className="analysis-box" style={{ marginTop: "20px" }}>
            <h3>What I Should Study</h3>

            {profile.roadmapProgress?.map((week, i) => (
              <div key={i} style={{ marginBottom: "15px" }}>
                <strong>{week.week}</strong>

                <ul>
                  {week.topics.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>

                <p>Status: {week.status}</p>

                <a
                  href={`https://www.youtube.com/results?search_query=${week.topics[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#4fa3ff" }}
                >
                  ▶ Start Learning
                </a>

                {week.status !== "completed" && (
                  <div>
                    <button
                      style={{ marginTop: "5px" }}
                      onClick={() => markWeekComplete(i)}
                    >
                      Mark Complete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* PROJECTS */}
          <div className="analysis-box" style={{ marginTop: "20px" }}>
            <h3>My Projects</h3>

            {profile.projects?.length > 0 ? (
              profile.projects.map((p, i) => (
                <div key={i}>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#4fa3ff" }}
                  >
                    {p.title}
                  </a>
                </div>
              ))
            ) : (
              <p>No projects added yet</p>
            )}

            <div style={{ marginTop: "15px" }}>
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    title: e.target.value
                  })
                }
                style={{ marginRight: "8px" }}
              />

              <input
                type="text"
                placeholder="Project Link"
                value={newProject.link}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    link: e.target.value
                  })
                }
                style={{ marginRight: "8px" }}
              />

              <button onClick={addProject}>
                + Add Project
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

const barStyle = {
  height: "8px",
  width: "100%",
  background: "rgba(255,255,255,0.1)",
  borderRadius: "8px",
  marginTop: "5px",
  overflow: "hidden"
};

const fillStyle = {
  height: "100%",
  background: "linear-gradient(90deg,#4f46e5,#22d3ee)",
  transition: "0.5s"
};

export default Profile;