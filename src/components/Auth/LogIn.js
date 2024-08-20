import React, { useRef, useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import styles from "./LogIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth-actions";

const LogIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    setError(null);
    try {
      await dispatch(loginUser(enteredEmail, enteredPassword));
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      bg={darkMode ? "dark" : "light"}
      data-bs-theme={darkMode ? "dark" : "light"}
    >
      <div
        className={styles.signInBox}
        style={{ backgroundColor: darkMode ? "#000" : "#fff" }}
      >
        <h2 className="text-center mb-4">LogIn</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <FloatingLabel
              controlId="formEmail"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email"
                ref={emailInputRef}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <FloatingLabel controlId="formPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordInputRef}
              />
            </FloatingLabel>
          </Form.Group>
          <div className="mt-3 mb-3">
            <span>Forgot password ? </span>
            <Link to="/auth/forgotpassword">Click Here</Link>
          </div>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Loading...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Form>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/auth/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};

export default LogIn;
