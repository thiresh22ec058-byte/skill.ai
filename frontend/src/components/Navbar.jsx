import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();

  /* Navigation Button */
  const navBtn = (path, label) => {
    const active = location.pathname === path;

    return (
      <Link to={path}>
        <button
          className={`px-4 py-2 rounded-xl border transition 
          ${active 
            ? "bg-green-500 text-white border-green-500" 
            : "border-gray-600 text-gray-300 hover:bg-gray-800"}`}
        >
          {label}
        </button>
      </Link>
    );
  };

  /* Logout Function */
  const handleLogout = () => {

    // remove token / user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect to login page
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#0b1324] border-b border-gray-800">

      {/* Logo */}
      <Link to="/home">
        <h1 className="text-xl font-bold text-blue-400 cursor-pointer">
          SkillAI
        </h1>
      </Link>

      {/* Navigation */}
      <div className="flex gap-3">

        {navBtn("/dashboard", "Dashboard")}
        {navBtn("/profile", "Profile")}
        {navBtn("/roadmap", "Roadmap")}
        {navBtn("/jobs", "Jobs")}
        {navBtn("/home", "Home")}

        <button 
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}