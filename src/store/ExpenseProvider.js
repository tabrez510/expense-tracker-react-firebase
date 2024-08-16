import React, { useState } from "react";
import ExpenseContext from "./expense-context";


const ExpenseProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const editItem = (id, updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  return (
    <ExpenseContext.Provider
      value={{ items, addItem, removeItem, editItem }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
