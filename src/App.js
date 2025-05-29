import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Sign from "./component/sign";
import Dashboard from "./component/dashboard";
import { ToastContainer } from "react-toastify";
import Expenses from "./component/Expenses";
import { ExpenseContextProvider } from "./context/ExpenseContext";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
export default function App() {
  return (
    <Router>
      <ToastContainer />
      <ExpenseContextProvider>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer/>
      </ExpenseContextProvider>
    </Router>
  );
}