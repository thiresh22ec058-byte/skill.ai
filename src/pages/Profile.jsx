import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newLink, setNewLink] = useState("");
  const [projectType, setProjectType] = useState("software");
  const [selectedFile, setSelectedFile] = useState(null);

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProfile(res.data);
      setName(res.data.name || "");
      setRole(res.data.role || "");
      setProfilePhoto(res.data.profilePhoto || "");
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ================= PROFILE IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePhoto(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/profile/update-profile",
        { name, role, profilePhoto },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditMode(false);
      fetchProfile();
    } catch (err) {
      console.error("Save Profile Error:", err);
    }
  };


  /* ================= PROJECT FILE UPLOAD ================= */
const handleProjectFile = (e) => {
  setSelectedFile(e.target.files[0]);
};

  /* ================= ADD PROJECT ================= */
  const addProject = async () => {
  if (!newTitle) return;

  const formData = new FormData();
  formData.append("title", newTitle);
  formData.append("type", projectType);

  if (projectType === "software") {
    formData.append("link", newLink);
  } else {
    formData.append("file", selectedFile);
  }

  await axios.post(
    "http://localhost:5000/api/profile/add-project",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );

  setNewTitle("");
  setNewLink("");
  setSelectedFile(null);
  fetchProfile();
};

  /* ================= DELETE PROJECT ================= */
  const deleteProject = async (index) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/profile/delete-project/${index}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchProfile();
    } catch (err) {
      console.error("Delete Project Error:", err);
    }
  };

 if (!profile) return <div>Loading...</div>;

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          padding: "60px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {/* ================= PROFILE CARD ================= */}
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            background: "linear-gradient(135deg,#111827,#1f2937)",
            padding: "30px",
            borderRadius: "18px",
            marginBottom: "30px"
          }}
        >
          <div style={{ display: "flex", gap: "30px" }}>
            <div>
              <img
                src={profilePhoto || "https://via.placeholder.com/140"}
                alt="profile"
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />

              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ marginTop: "10px" }}
                />
              )}
            </div>

            <div style={{ flex: 1 }}>
              {editMode ? (
                <>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      fontSize: "24px",
                      marginBottom: "10px",
                      width: "100%"
                    }}
                  />

                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      padding: "6px",
                      marginBottom: "15px"
                    }}
                  >
                    <option>Student</option>
                    <option>Fresher</option>
                    <option>Working Professional</option>
                  </select>

                  <button
                    onClick={saveProfile}
                    style={{
                      padding: "8px 18px",
                      background: "#16a34a",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      cursor: "pointer"
                    }}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <h2>{profile.name}</h2>
                  <p style={{ color: "#9ca3af" }}>{profile.role}</p>
                  <p style={{ color: "#facc15" }}>{profile.careerGoal}</p>

                  <button
                    onClick={() => setEditMode(true)}
                    style={{
                      marginTop: "10px",
                      padding: "6px 14px",
                      background: "#2563eb",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      cursor: "pointer"
                    }}
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ================= ROADMAP ================= */}
        {/* ================= ROADMAP ================= */}
<div
  style={{
    width: "100%",
    maxWidth: "900px",
    background: "linear-gradient(135deg,#111827,#1f2937)",
    padding: "25px",
    borderRadius: "18px",
    marginBottom: "30px"
  }}
>
  <h3>Learning Roadmap</h3>

  {profile.roadmapProgress?.length === 0 && (
    <p style={{ color: "#9ca3af" }}>No roadmap yet</p>
  )}

  {profile.roadmapProgress?.map((week, index) => (
    <div key={index} style={{ marginTop: "8px" }}>
      <strong>{week.week}</strong> — {week.topics?.[0]} ({week.status})
    </div>
  ))}
</div>

        {/* ================= PROJECT SECTION ================= */}
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            background: "linear-gradient(135deg,#111827,#1f2937)",
            padding: "25px",
            borderRadius: "18px"
          }}
        >
          <h3>My Projects</h3>

          {profile.projects?.map((p, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "10px",
      padding: "10px",
      background: "#1f2937",
      borderRadius: "8px"
    }}
  >
    <span>{p.title}</span>

    <div style={{ display: "flex", gap: "10px" }}>

      {/* Show View if link exists */}
      {p.link && (
        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#3b82f6" }}
        >
          View
        </a>
      )}

      {/* Show View File if file exists */}
      {p.file && (
        <a
          href={`http://localhost:5000${p.file}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#3b82f6" }}
        >
          View File
        </a>
      )}

      <button
        onClick={() => deleteProject(i)}
        style={{
          background: "#dc2626",
          border: "none",
          padding: "5px 10px",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer"
        }}
      >
        Delete
      </button>
    </div>
  </div>
))}

          {/* Add Project Form */}
          <div style={{ marginTop: "20px" }}>
            <input
              placeholder="Project Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "6px"
              }}
            />

            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "6px"
              }}
            >
              <option value="software">Software Project</option>
              <option value="hardware">Hardware Project</option>
            </select>

            {projectType === "software" ? (
              <input
                placeholder="Project Link"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "6px"
                }}
              />
            ) : (
              <input
                type="file"
                accept=".pdf,.ppt,.pptx,.jpg,.png,.mp4"
                onChange={handleProjectFile}
                style={{ marginBottom: "10px" }}
              />
            )}

            <button
              onClick={addProject}
              style={{
                background: "#16a34a",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Add Project
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;