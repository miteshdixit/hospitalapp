/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const { isAuthenticated, setAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/login", {
        email, password, confirmPassword , role:"Admin"
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      toast.success(response.data.message);
      setAuthenticated(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/appointment" />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Sign in</h2>
      <p>Please Login to continue</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat soluta, impedit quidem libero laboriosam ratione eligendi vel, tenetur corrupti eius culpa voluptates officia minima aperiam fugit dicta provident, numquam ipsa.</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <div style={{
          gap: "10px",
          justifyContent: "flex-end",
          flexDirection: "row",
          display: "flex",
        }}>
          <p style={{ marginBottom: "none" }}>Not Registered?</p>
          <Link to="/register" style={{ textDecoration: "none", alignItems: "center" }}>
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "flex-end", alignItems: "center", display: "flex" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
