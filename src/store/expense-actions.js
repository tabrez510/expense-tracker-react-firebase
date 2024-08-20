import axios from "axios";
import { expenseActions } from "./expense";

// Fetch Expenses
export const fetchExpenses = () => {
  return async (dispatch) => {
    const uid = localStorage.getItem("uid");
    const fetchData = async () => {
      const response = await axios.get(
        `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${uid}.json`
      );
      const data = response.data;
      return data;
    };

    try {
      const expensesData = await fetchData();
      if (expensesData) {
        const loadedExpenses = Object.keys(expensesData).map((key) => ({
          id: key,
          ...expensesData[key],
        }));
        dispatch(expenseActions.saveData(loadedExpenses));
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };
};

// Add Expense
export const addExpense = (expense) => {
  return async (dispatch) => {
    const uid = localStorage.getItem("uid");
    const sendData = async () => {
      const response = await axios.post(
        `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${uid}.json`,
        expense
      );
      return response.data.name;
    };

    try {
      const id = await sendData();
      dispatch(expenseActions.addItem({ id, ...expense }));
    } catch (error) {
      console.error("Failed to add expense:", error.message);
    }
  };
};

// Edit Expense
export const editExpense = (id, updatedExpense) => {
  return async (dispatch) => {
    const uid = localStorage.getItem("uid");
    const updateData = async () => {
      await axios.put(
        `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${uid}/${id}.json`,
        updatedExpense
      );
    };

    try {
      await updateData();
      dispatch(
        expenseActions.editItem({
          id,
          updatedExpense: { ...updatedExpense, id },
        })
      );
    } catch (error) {
      console.error("Failed to edit expense:", error);
    }
  };
};

// Delete Expense
export const deleteExpense = (id) => {
  return async (dispatch) => {
    const uid = localStorage.getItem("uid");
    const deleteData = async () => {
      await axios.delete(
        `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${uid}/${id}.json`
      );
    };

    try {
      await deleteData();
      dispatch(expenseActions.removeItem(id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };
};
