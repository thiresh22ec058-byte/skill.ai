import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>Skill AI</div>

      <div style={styles.links}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/roadmap" style={styles.link}>Roadmap</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <button onClick={logout} style={styles.logout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#0f172a",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#4fa3ff"
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "500"
  },
  logout: {
    background: "#ef4444",
    border: "none",
    padding: "6px 12px",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Navbar;