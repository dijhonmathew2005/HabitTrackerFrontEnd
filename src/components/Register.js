import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Using the proxy path to reach your authRoutes.js
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      // Our backend now returns a token on registration
      localStorage.setItem("token", res.data.token);
      
      alert("Registration successful! Welcome to Habit Tracker.");
      
      // Redirect to the habits dashboard immediately
      navigate("/habits");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed. Email might already exist.");
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
          </div>
        </form>
        <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;