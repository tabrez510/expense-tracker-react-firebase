import React, { useRef, useState } from "react";
import {
  Container,
  Form,
  Button,
  FloatingLabel,
  Alert,
  Spinner,
} from "react-bootstrap";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const SignUp = () => {
  const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cnfPasswordRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredCnfPassword = cnfPasswordRef.current.value;
    try {
      setError(null);
      setIsloading(true);
      if (enteredPassword !== enteredCnfPassword) {
        throw new Error("Password did not match.");
      }
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        let error = "SignUp Failed";
        if (data && data.error && data.error.message) {
          error = data.error.message;
        }
        throw new Error(error);
      }

      dispatch(authActions.login({ token: data.idToken, uid: data.localId }));
      emailRef.current.value = "";
      passwordRef.current.value = "";
      cnfPasswordRef.current.value = "";
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsloading(false);
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
        className={styles.signUpBox}
        style={{ backgroundColor: darkMode ? "#000" : "#fff" }}
      >
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={formSubmitHandler}>
          <Form.Group controlId="formEmail" className="mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="Email" ref={emailRef} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <FloatingLabel
              controlId="formConfirmPassword"
              label="Confirm Password"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={cnfPasswordRef}
              />
            </FloatingLabel>
          </Form.Group>
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
              "Sign Up"
            )}
          </Button>
        </Form>
        <div className="text-center mt-3">
          <span>Have an account? </span>
          <Link to="/auth/login">Login</Link>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
