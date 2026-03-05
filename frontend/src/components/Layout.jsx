import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={`dashboard ${collapsed ? "collapsed" : ""}`}>

      {/* Sidebar */}
      <div className="sidebar">

        <div className="sidebar-header">
          <h2 className="logo">Skill.ai</h2>
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <nav>
          <NavLink to="/roadmap">Roadmap</NavLink>
          <NavLink to="/progress">Progress</NavLink>
          <NavLink to="/jobready">Job Ready</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>

      </div>

      {/* Main Content */}
      <div className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

export default Layout;