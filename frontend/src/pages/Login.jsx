import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      localStorage.setItem("token", response.data.token);

      alert("Login Successful!");

      // 🔥 IMPORTANT — go to Welcome first
      navigate("/welcome");

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