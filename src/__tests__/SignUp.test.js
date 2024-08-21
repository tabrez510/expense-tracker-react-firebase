import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth";
import themeReducer from "../store/theme";
import SignUp from "../components/Auth/SignUp";

const mockStore = (initialState) => {
  return configureStore({
    reducer: { 
      auth: authReducer,
      theme: themeReducer,
    },
    preloadedState: initialState,
  });
};

describe("SignUp Component", () => {
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

  test("renders the sign up form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

  test("displays error message when passwords do not match", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Passwords did not match.");
    });
  });

  test("displays loading spinner while signing up", async () => {
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
          <SignUp />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });
  });

  test("handles successful sign up and redirects to dashboard", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ idToken: "test-token", localId: "test-uid" }),
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/signup"]}>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });

  test("shows error message on sign up failure", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: { message: "Sign up failed" } }),
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Sign up failed");
    });
  });

});
