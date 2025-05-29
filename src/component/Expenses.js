import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../style/expen.css";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../URL";
import { toast, ToastContainer } from "react-toastify";
export default function Expenses() {
  const [data, setData] = useState([]); // Store expenses data
  const [page, setPage] = useState(1); // Manage the current page
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(0);
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);
  const [initialAmt, setInitialAmt] = useState();
  const [finalAmt, setFinalAmt] = useState();
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();

  // for updates
  const [check, setCheck] = useState(false);
  const [amount, setAmount] = useState();
  const [des, setDes] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [expenseId, setExpenseId] = useState(""); // Store the ID of the expense being edited
  const [categoryData , setCategoryData ] = useState([]);

  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
 

  // Adding expense
  const allExpense = async (currentPage) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      let url = `${baseURL}/allExpense?page=${currentPage}&limit=${limit}`;
      if (selectedCategoryData.length > 0) {
        url += `&category=${selectedCategoryData.join(",")}`;
      }
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
  
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.totalPages);
  
      let uniqueCategories = [...categoryData.map(cat => cat.toUpperCase())];
  
      result.data.forEach((expense) => {
        if (expense.category) {
          const categoryUpper = expense.category.toUpperCase();
          if (!uniqueCategories.includes(categoryUpper)) {
            uniqueCategories.push(categoryUpper);
          }
        }
      });
  
      setCategoryData(uniqueCategories);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  
  // Delete expense
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/deleteExpense/${id}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete expense");
      }

      // Remove the deleted expense from the state
      setData((prevData) => prevData.filter((expense) => expense._id !== id));

      toast.success("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Error in deletion of Expense");
    }
  };

  const handleClose = () => {
    setCheck((prev) => !prev);
  };

  // Update expense
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const updatedExpense = {
      des,
      amount,
      category,
      date,
    };

    try {
      const response = await fetch(
       `${baseURL}/updateExpense/${expenseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(updatedExpense),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update expense");
      }

      // Update the data state with the updated expense
      setData((prevData) =>
        prevData.map((expense) =>
          expense._id === expenseId ? { ...expense, ...updatedExpense } : expense
        )
      );

      toast.success("Expense updated successfully");
      setCheck(false); // Close the form after update
    } catch (error) {
      console.error("Error updating expense:", error);
     toast.error("Error in Updating the Expense");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    const updateLimit = () => {
      let calculatedLimit = 0;
      const width = window.innerWidth;

      if (width > 1000) {
        calculatedLimit = 8;
      } else if (width <= 1000 && width > 640) {
        calculatedLimit = 6;
      } else if (width > 450 && width <= 640) {
        calculatedLimit = 4;
      } else {
        calculatedLimit = 2;
      }

      setLimit(calculatedLimit);
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);

    const delayDebounce = setTimeout(() => {
      allExpense(page);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [
    page,
    selectedCategoryData,
    initialAmt,
    finalAmt,
    initialDate,
    finalDate,
  ]);

  // Handle checkbox change for category selection
  const handleCategoryChange = (category) => {
    setSelectedCategoryData((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Handle edit button click
  const handleEdit = (expense) => {
    window.scroll(0 , 0);
    setExpenseId(expense._id); // Store expense ID to update
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
    setDes(expense.des);
    setCheck(true); // Open the update form
  };

  return (
    <>
    <ToastContainer/>
      <div className="main-div-expense">
        <div className="filter">
          <div className="category">
            {categoryData.map((ct, index) => (
              <div key={index} className="checkbox">
                <label htmlFor={ct}>{ct}</label>
                <input
                  type="checkbox"
                  id={ct}
                  checked={selectedCategoryData.includes(ct)}
                  onChange={() => handleCategoryChange(ct)}
                />
              </div>
            ))}
          </div>
          <div className="left-side-filter">
            <div className="amount">
              <input
                type="number"
                placeholder="Enter Initial Amt"
                onChange={(e) => setInitialAmt(e.target.value)}
              />
              <input
                type="number"
                placeholder="Enter Final Amt"
                onChange={(e) => setFinalAmt(e.target.value)}
              />
            </div>
            <div className="date">
              <input
                type="date"
                placeholder="Enter the Starting Date"
                onChange={(e) => setInitialDate(e.target.value)}
              />
              <input
                type="date"
                placeholder="Enter the Final Date"
                onChange={(e) => setFinalDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="expenses-list">
          {data.length === 0 ? (
            <p>No expenses found</p>
          ) : (
            data
              .filter(
                (expense) =>
                  (!initialAmt || expense.amount >= initialAmt) &&
                  (!finalAmt || expense.amount <= finalAmt)
              )
              .filter(
                (expense) =>
                  (!initialDate ||
                    new Date(expense.date) >= new Date(initialDate)) &&
                  (!finalDate || new Date(expense.date) <= new Date(finalDate))
              )
              .map((expense, index) => (
                <div key={index} className="expense-item">
                  <div className="delete-updates">
                    <div className="delete">
                      <button onClick={() => handleDelete(expense._id)}>
                        Delete
                      </button>
                    </div>
                    <div className="updates">
                      <button onClick={() => handleEdit(expense)}>Edit</button>
                    </div>
                  </div>
                  <div className="content">
                    <div className="amt box">
                      <div className="heading">Amount:</div>
                      <div className="ans">{expense.amount}</div>
                    </div>
                    <div className="ct box">
                      <div className="heading">Category:</div>
                      <div className="ans">{expense.category}</div>
                    </div>
                    <div className="date box">
                      <div className="heading">Date:</div>
                      <div className="ans">{formatDate(expense.date)}</div>
                    </div>
                    <div className="des box">
                      <div className="heading">Description:</div>
                      <div className="ans">{expense.des}</div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
          <br /><br />
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
        <br /><br />
      </div>

      {check && (
        <div className="form">
          <div className="details sign">
            <div className="img">
              <img src={logo} alt="Logo" />
            </div>
            <div className="input">
              <input
                type="number"
                placeholder="Enter Your Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="date"
                placeholder="Enter Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Enter Description"
                value={des}
                onChange={(e) => setDes(e.target.value)}
              />
            </div>
            <div className="btn">
              <button type="button"
                className="btn"
                id="btn-1" onClick={handleUpdate}>Update</button>
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
    </>
  );
}