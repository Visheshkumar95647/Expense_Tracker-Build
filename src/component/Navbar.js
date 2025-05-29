import React, { useContext, useEffect } from "react";
import logo from '../assets/logo.webp';
import { useNavigate } from "react-router-dom";
import '../style/nav.css';
import ExpenseContext from "../context/ExpenseContext";

export default function Navbar() {
    const navigate = useNavigate();
    const LogOut = async () => {
        localStorage.clear();
        navigate('/login');
    }
    const { check, setCheck } = useContext(ExpenseContext);

    const toggleMode = () => {
        setCheck(prevCheck => !prevCheck);
    };
    const token = localStorage.getItem("token");

    useEffect(() => {
        const img = new Image();
        img.src = logo; 
      }, []);
    return (
        <div>
            {<nav>
                {token &&  <div className="img">
                    <img src={logo} alt="Logo" width="150" height="150" />
                </div>}
                {token && <div className="nav-right">
                    <button onClick={toggleMode}>
                        {check ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <button onClick={LogOut}>LogOut</button>
                </div>}
            </nav>}
        </div>
    );
}
