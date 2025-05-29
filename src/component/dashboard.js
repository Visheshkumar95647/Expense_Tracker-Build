import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import "../style/dash.css";
import "../style/login.css";
import { ToastContainer, toast } from "react-toastify";
import ExpenseContext from "../context/ExpenseContext";
import exImg from "../assets/expense-track.webp";
import ExpensePieChart from "./Graphics/PieChart";
import BarGraph from "./Graphics/BarGraph";
import { baseURL } from "../URL";
import '../style/grapics.css'
const Dashboard = () => {
  const navigate = useNavigate();
  const [checking, setchecking] = useState(false);
  const [amount, setAmount] = useState();
  const [des, setDes] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(""); 
  const { check } = useContext(ExpenseContext);



  const addExpense = async () => {
    if (amount === 0) {
      toast.error("Amount Should be greater than 0.");
      return;
    }
    if (!date || !category) {
      toast.error("Please fill all the fields");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${baseURL}/addexpense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          amount: amount,
          des: des,
          category: category,
          date: date,
        }),
      });
        const result = await response.json();
        toast.success("Added Successfully");
    } catch (error) {
      toast.error("Error is coming");
    }
  };

  const handleClose = () => {
    setchecking((prev) => !prev);
  };
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  } , [])
   useEffect(() => {
      const img = new Image();
      img.src = exImg; 
    }, []);
  return (
    <>
      <div
        className="dash"
        style={{
          backgroundColor: check ? "rgb(14, 37, 59)" : "white",
        }}
      >
        <ToastContainer />
        <main>
          <div className="left-dash">
            <div>
              <h1>
                <strong>WalletWatch</strong>
              </h1>
            </div>
            <div
              style={{
                color: check ? "white" : "maroon",
              }}
              className="content"
            >
              <h3>
                Expenses are divided into fixed (like rent) and variable (like
                dining out). Following the 50/30/20 rule, it's ideal to allocate
                50% of income to needs, 30% to wants, and 20% to
                savings.Inflation gradually increases costs, reducing purchasing
                power over time....
              </h3>
            </div>
            <div className="btns">
              <div className="btn-1">
                <button onClick={handleClose}>Add-Expenses</button>
              </div>
              <div
                className="btn"
                style={{
                  border: check ? "none" : "1px solid black",
                  height: "40px",
                  overflow: "hidden",
                  width: "150px",
                }}
              >
                <Link to="/expenses" className="btn-2">
                  Show All Expenses
                </Link>
              </div>
            </div>
          </div>
          <div className="right-dash">
            <img src={exImg} alt="" />
          </div>
        </main>
        <div className="graphics">
          <div
            className="pie-chart chart-1"
            style={{
              border: check ? "2px solid white" : "2px solid black",
              boxShadow:check ? "0px 10px 10px 5px rgba(255, 255, 255, 0.3)" :"0px 10px 10px 5px orange",
            }}
          >
            <ExpensePieChart />
          </div>
          <div
            className="bar-chart chart-2"
            style={{
              border: check ? "2px solid white" : "2px solid black",
              boxShadow:check ? "0px 10px 10px 5px rgba(255, 255, 255, 0.3)" :"0px 10px 10px 5px orange",
            }}
          >
            <BarGraph />
          </div>
        </div>

        {checking && (
          <div className="form">
            <div className="details sign">
              <div className="img">
                <img src={logo} alt="Logo" />
              </div>
              <div className="input">
                <input
                  type="number"
                  placeholder="Enter Your Amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Enter Category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="date"
                  placeholder="Enter Date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Enter Description"
                  onChange={(e) => setDes(e.target.value)}
                />
              </div>
              <div className="btns">
                <button
                  type="button"
                  className="btn"
                  id="btn-1"
                  onClick={addExpense}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn"
                  id="btn-2"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
