import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const btnStyle = {
    padding: "7px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.25s ease"
  };

  const activeStyle = {
    background: "#22c55e",
    color: "white",
    border: "none"
  };

  const getStyle = (path) =>
    location.pathname === path
      ? { ...btnStyle, ...activeStyle }
      : btnStyle;

  return (

    <div
      style={{
        width: "100%",
        padding: "14px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(90deg,#0f172a,#020617)"
      }}
    >

      <h2
        style={{ color: "#60a5fa", cursor: "pointer" }}
        onClick={() => navigate(token ? "/dashboard" : "/")}
      >
        SkillAI
      </h2>

      <div style={{ display: "flex", gap: "12px" }}>

        {token && (
          <>
            <button
              style={getStyle("/dashboard")}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>

            <button
              style={getStyle("/profile")}
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>

            <button
              style={getStyle("/roadmap")}
              onClick={() => navigate("/roadmap")}
            >
              Roadmap
            </button>

            <button
              style={getStyle("/jobs")}
              onClick={() => navigate("/jobs")}
            >
              Jobs
            </button>

            <button
              style={getStyle("/resume-builder")}
              onClick={() => navigate("/resume-builder")}
            >
              Resume
            </button>

            <button
              style={getStyle("/skill-gap")}
              onClick={() => navigate("/skill-gap")}
            >
              Skill Gap
            </button>

            <button
              style={getStyle("/ai-chat")}
              onClick={() => navigate("/ai-chat")}
            >
              AI Chat
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: "7px 16px",
                borderRadius: "10px",
                border: "none",
                background: "#ef4444",
                color: "white",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        )}

      </div>

    </div>

  );

}

export default Navbar;