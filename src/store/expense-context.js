import React from "react";

const ExpenseContext = React.createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    editItem: (id, updatedItem) => {}
});

export default ExpenseContext;