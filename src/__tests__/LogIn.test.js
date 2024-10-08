import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth";
import themeReducer from "../store/theme";
import LogIn from "../components/Auth/LogIn";

const mockStore = (initialState) => {
  return configureStore({
    reducer: { 
      auth: authReducer,
      theme: themeReducer,
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
    });
  });

  test("renders the login form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LogIn />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
  });

  test("displays error message when login fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: { message: "INVALID_PASSWORD" } }),
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LogIn />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("INVALID_PASSWORD");
    });
  });

  test("displays loading spinner while submitting", async () => {
    global.fetch = jest.fn(() =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              ok: true,
              json: () => Promise.resolve({ idToken: "test-token", localId: "test-uid" }),
            }),
          500
        )
      )
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LogIn />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });
  });

  test("redirects to dashboard on successful login", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ idToken: "test-token", localId: "test-uid" }),
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });
});
