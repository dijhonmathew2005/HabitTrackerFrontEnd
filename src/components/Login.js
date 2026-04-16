import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for redirection

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    // Prevent page reload if you use a <form> tag
    if (e) e.preventDefault(); 

    try {
      // Using the relative path since you have the proxy set up
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      // 1. Store the token
      localStorage.setItem("token", res.data.token);
      
      alert("Login successful! ");

      // 2. Redirect the user to the habit list page
      navigate("/habits"); 
      
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      
      // Improved error message from your backend
      const message = err.response?.data?.message || "Login failed. Check your connection.";
      alert(message);
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email (e.g., john@test.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // Allows pressing "Enter" to log in
            onKeyDown={(e) => e.key === "Enter" && handleLogin()} 
          />
          <button onClick={handleLogin}>Login</button>
        </div>
        <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
