import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        return alert("Email and password are required");
      }

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name: email.split("@")[0],
          email,
          password,
        }
      );

      alert("Registered Successfully!");
      navigate("/skillinput");

    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data);
      
      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        <button
          onClick={handleRegister}
          className="primary-btn"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer", marginTop: "15px" }}
        >
          Already have account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;