import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../store/auth";
import themeReducer from "../../store/theme";
import expenseReducer from "../../store/expense";
import Expenses from "./Expenses";
import ExpenseForm from "./ExpenseForm";
const mockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      theme: themeReducer,
      expense: expenseReducer,
    },
    preloadedState: initialState,
  });
};

describe("LogIn Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        token: null,
        email: null,
        isLoggedIn: false,
      },
      theme: {
        darkMode: false,
        isPremium: false,
      },
      expense: {
        items: [
          {
            id: "1",
            amount: "100",
            description: "Test Expense 1",
            category: "Food",
          },
          {
            id: "2",
            amount: "200",
            description: "Test Expense 2",
            category: "Fuel",
          },
        ],
      },
    });
  });

  test("fetching expenses", async () => {
    const mockData = {
      1: { amount: "100", description: "Groceries", category: "Food" },
      2: { amount: "50", description: "Gas", category: "Fuel" },
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Expenses />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
    });
  });

  test("adding expense", async () => {
    const mockExpense = {
      amount: "150",
      description: "Test Expense Add",
      category: "Food",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: "mock-id" }),
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ExpenseForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Amount/i), {
      target: { value: mockExpense.amount },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: mockExpense.description },
    });
    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: mockExpense.category },
    });

    fireEvent.click(screen.getByText('Add'));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `https://http-request-b6341-default-rtdb.firebaseio.com/expenses/${localStorage.getItem(
          "uid"
        )}.json`,
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(mockExpense),
        })
      );
    });
  });

});
