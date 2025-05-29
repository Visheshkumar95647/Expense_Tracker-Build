import React, { useEffect } from "react";
import "../style/footer.css";
import logo from "../assets/logo.webp";

const Footer = () => {
  useEffect(() => {
    const img = new Image();
    img.src = logo; 
  }, []);

  const token = localStorage.getItem("token");

  return (
    <>
        <div className="footer">
          {<div className="foot">
            <div className="img">
              <img src={logo} alt="Logo" loading="lazy"/>
            </div>
            <div className="heading">
              <h1>WalletWatch</h1>
            </div>
            <div>
              <h2>Spend wisely</h2>
            </div>
          </div>}
        </div>
    </>
  );
};

export default Footer;
