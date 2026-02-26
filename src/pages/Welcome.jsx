import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-container">

      <nav className="navbar">
        <div 
          className="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          SkillAI
        </div>

        <div className="nav-links">
          <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Home
          </span>

          <span onClick={() => scrollToSection(aboutRef)}>
            About
          </span>

          <span onClick={() => scrollToSection(contactRef)}>
            Contact
          </span>

          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </nav>

      <div className="hero-section">
        <h1 className="hero-title">
          Learn. Build. Succeed.
        </h1>

        <p className="subtitle">
          A smart AI-powered platform that helps students choose the right skills,
          follow a structured roadmap, and become job-ready.
        </p>

        <button 
          className="primary-btn"
          onClick={() => navigate("/usertype")}
        >
          Get Started →
        </button>
      </div>

      <div className="section" ref={aboutRef}>
        <h2>About SkillAI</h2>
        <p>
          SkillAI is an AI-powered platform that guides students through
          structured skill development paths and helps them become job-ready.
        </p>
      </div>

      <div className="section" ref={contactRef}>
        <h2>Contact Us</h2>
        <p>Email: support@skillai.com</p>
      </div>

    </div>
  );
}

export default Welcome;