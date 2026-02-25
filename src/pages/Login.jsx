import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Step 3 – Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return alert("Please enter email and password");
      }

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password
        }
      );

      // ✅ Save token
      localStorage.setItem("token", response.data.token);

      alert("Login Successful!");
      navigate("/profile");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        <button onClick={handleLogin} className="primary-btn">
          Login
        </button>

        <p
          onClick={() => navigate("/register")}
          style={{ cursor: "pointer", marginTop: "15px" }}
        >
          Don't have account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;