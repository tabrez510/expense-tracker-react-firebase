import { expenseActions } from "./expense";

// Fetch Expenses
export const fetchExpenses = () => {
  return async (dispatch) => {
    const uid = localStorage.getItem("uid");
    try {
      const fetchData = async () => {
        const response = await fetch(
          `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${uid}.json`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        
        if (!response.ok) {
          let errorMessage = "Could not fetched expenses!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }
        return data;
      };

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
    try {
      const sendData = async () => {
        const response = await fetch(
          `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${uid}.json`,
          {
            method: "POST",
            body: JSON.stringify(expense),
          }
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          let errorMessage = "Could not add expense!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }
        return data.name;
      };

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

    try {
      const updateData = async () => {
        const res = await fetch(
          `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${uid}/${id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(updatedExpense),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          let errorMessage = "Could not edit expense!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }
      };

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
    try {
      const deleteData = async () => {
        const res = await fetch(
          `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${uid}/${id}.json`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (!res.ok) {
          let errorMessage = "Could not edit expense!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }
      };

      await deleteData();
      dispatch(expenseActions.removeItem(id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };
};
