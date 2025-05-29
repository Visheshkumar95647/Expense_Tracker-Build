// MyContext.js
import React, { createContext, useState } from "react";

const ExpenseContext = createContext();

export const ExpenseContextProvider = ({ children }) => {
    const [check , setCheck] = useState([]);

  return (
    <ExpenseContext.Provider value={{ check, setCheck }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
