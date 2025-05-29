import React, { useState, useCallback, useEffect } from "react";
import "../style/login.css"; 
import logo from "../assets/logo.webp"; // Import the image
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../URL";

const Login = () => {
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [pass, setPass] = useState(sessionStorage.getItem("pass") || "");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("pass", pass);
  }, [email, pass]);


  useEffect(() => {
    const img = new Image();
    img.src = logo; 
  }, []);

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handlePassChange = useCallback((e) => setPass(e.target.value), []);

  const handleLogin = useCallback(async () => {
    if (!email || !pass) {
      toast.error("Please fill in both email and password.");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
        keepalive: true, 
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        sessionStorage.removeItem("email"); 
        sessionStorage.removeItem("pass");
        toast.success("Login Successfully");
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while logging in.");
    }
  }, [email, pass, navigate]);

  return (
    <div className="form">
      <ToastContainer />
      <div className="details">
        <div className="img">
          <img src={logo} alt="Logo" width="150" height="150" />
        </div>
        <div className="email">
          <input type="text" placeholder="Enter Your Email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="password">
          <input type="password" placeholder="Enter Your Password" value={pass} onChange={handlePassChange} />
        </div>
        <div className="btns">
          <button type="button" className="btn" id="btn-1" onClick={handleLogin}>
            Login
          </button>
          <button type="button" className="btn" id="btn-2">
            <Link to="/sign">Signup</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
