import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    try {

      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password
        }
      );

      const token = response.data?.token;

      if (!token) {
        alert("Login failed. Token missing.");
        return;
      }

      // Save token
      localStorage.setItem("token", token);

      console.log("Saved token:", token);

      alert("Login Successful!");

      // Redirect to welcome
      navigate("/welcome");

    } catch (error) {

      console.error("Login Error:", error);

      alert(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );

    } finally {

      setLoading(false);

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

        <button
          onClick={handleLogin}
          className="primary-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
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