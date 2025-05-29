import React, { useState } from "react";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../URL";
export default function Sign() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    if (!firstname || !lastname || !email || !pass) {
      toast.error("Please fill all the credentials.");
      return;
    }
    try {
      const response = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname,
          lastname,
          email: email,
          password: pass,
        }),
      });
      const data = response.json();
      if (response.ok) {
        console.log(data.token);
        navigate("/login");
      } else {
        console.error("Error:", data);
        toast.error(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("An error occurred while Sign in. Please try again.");
    }
  };
  return (
    <div className="form">
      <ToastContainer />
      <div className="details sign">
        <div className="img">
          <img src={logo} alt="" />
        </div>
        <div className="first-name">
          <input
            type="text"
            id="username"
            placeholder="Enter Your First name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="last-name">
          <input
            type="text"
            id="username"
            placeholder="Enter Your Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="email">
          <input
            type="text"
            id="username"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password">
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="btns">
          <button
            type="button"
            className="btn"
            id="btn-2"
            onClick={handleSignIn}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}
